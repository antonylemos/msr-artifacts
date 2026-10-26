#!/usr/bin/env node

/**
 * Check if required ports are available before starting the dev server
 * This helps identify port conflicts early
 */

const net = require('net');

const REQUIRED_PORTS = [
  { port: 3000, name: 'Shell (Host)' },
  { port: 3001, name: 'Auth MF' },
  { port: 3002, name: 'Dashboard MF' },
  { port: 3003, name: 'Admin MF' },
  { port: 3004, name: 'Messaging MF' },
];

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve({ port, available: false });
      } else {
        resolve({ port, available: true });
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve({ port, available: true });
    });
    
    server.listen(port, '127.0.0.1');
  });
}

async function checkAllPorts() {
  console.log('🔍 Checking port availability...\n');
  
  const results = await Promise.all(
    REQUIRED_PORTS.map(async ({ port, name }) => {
      const result = await checkPort(port);
      return { ...result, name };
    })
  );
  
  const unavailable = results.filter(r => !r.available);
  
  if (unavailable.length === 0) {
    console.log('✅ All ports are available!\n');
    results.forEach(({ port, name }) => {
      console.log(`   ✓ Port ${port} (${name})`);
    });
    console.log('\n🚀 You can now run: pnpm dev\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some ports are already in use:\n');
    unavailable.forEach(({ port, name }) => {
      console.log(`   ✗ Port ${port} (${name}) - OCCUPIED`);
    });
    console.log('\n💡 Solutions:');
    console.log('   1. Stop the applications using these ports');
    console.log('   2. Change the port configuration in the respective vite.config.ts files');
    console.log('   3. On Windows: netstat -ano | findstr :<PORT> to find the process');
    console.log('   4. On Unix: lsof -ti:<PORT> | xargs kill -9 to kill the process\n');
    process.exit(1);
  }
}

checkAllPorts().catch((error) => {
  console.error('❌ Error checking ports:', error);
  process.exit(1);
});
