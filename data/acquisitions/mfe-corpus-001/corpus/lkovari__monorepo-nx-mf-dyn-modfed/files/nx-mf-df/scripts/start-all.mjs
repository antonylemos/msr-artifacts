import { spawn } from 'node:child_process';
import net from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const remoteSequence = [
  { project: 'mf_remote_c', port: 4203 },
  { project: 'mf_remote_b', port: 4202 },
  { project: 'mf_remote_a', port: 4201 },
];

const staggerMs = 2000;
const remoteReadyPollMs = 600;
const maxWaitRemotesAfterLastSpawnMs = 180000;

const children = [];

function spawnNxServe(project) {
  const child = spawn('pnpm', ['exec', 'nx', 'run', `${project}:serve`], {
    cwd: root,
    stdio: 'inherit',
    shell: false,
    env: {
      ...process.env,
      NX_TUI: 'false',
    },
  });
  children.push(child);
  return child;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function tcpHandshakeOnce(port, host) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port, host }, () => {
      socket.destroy();
      resolve(true);
    });
    socket.setTimeout(1200);
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });
  });
}

async function remotePortAcceptsConnections(port) {
  if (await tcpHandshakeOnce(port, '127.0.0.1')) {
    return true;
  }
  return tcpHandshakeOnce(port, '::1');
}

async function waitUntilRemotesListenOrTimeout() {
  const deadline = Date.now() + maxWaitRemotesAfterLastSpawnMs;
  while (Date.now() < deadline) {
    const states = await Promise.all(
      remoteSequence.map(({ port }) => remotePortAcceptsConnections(port))
    );
    if (states.every(Boolean)) {
      return;
    }
    await sleep(remoteReadyPollMs);
  }
}

function killAllChildren() {
  for (const child of children) {
    if (child.pid && !child.killed) {
      child.kill('SIGTERM');
    }
  }
}

function waitForChildExit(child) {
  return new Promise((resolve, reject) => {
    child.once('exit', (code, signal) => {
      if (signal) {
        resolve();
        return;
      }
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Process exited with code ${code}`));
    });
    child.once('error', reject);
  });
}

process.on('SIGINT', () => {
  killAllChildren();
  process.exit(130);
});

process.on('SIGTERM', () => {
  killAllChildren();
  process.exit(143);
});

async function main() {
  for (const { project } of remoteSequence) {
    spawnNxServe(project);
    await sleep(staggerMs);
  }

  await waitUntilRemotesListenOrTimeout();

  const host = spawnNxServe('main-host');
  try {
    await waitForChildExit(host);
  } finally {
    killAllChildren();
  }
}

main().catch((err) => {
  console.error(err);
  killAllChildren();
  process.exit(1);
});
