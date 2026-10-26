import { createDemoShellH2rQuery } from './demo-shell-h2r-query.factory';
import {
  DEMO_SHELL_H2R_QUERY,
  DEMO_SHELL_H2R_QUERY_RESULT,
} from './message-names';

describe('createDemoShellH2rQuery', () => {
  it('creates a query with expected result contract', () => {
    const query = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'What time is it?' },
    });
    expect(query.messageName).toBe(DEMO_SHELL_H2R_QUERY);
    expect(query.expectedResult).toBe(DEMO_SHELL_H2R_QUERY_RESULT);
    expect(query.kind).toBe('query');
    expect(query.queryName).toBe('demo.shell.h2r.query');
    expect(query.payload.q).toBe('What time is it?');
  });

  it('includes timeoutMs when provided', () => {
    const query = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Ping' },
      timeoutMs: 5000,
    });
    expect(query.timeoutMs).toBe(5000);
  });

  it('omits timeoutMs when not provided', () => {
    const query = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Ping' },
    });
    expect('timeoutMs' in query).toBe(false);
  });

  it('defaults sensitivity to public', () => {
    const query = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Ping' },
    });
    expect(query.sensitivity).toBe('public');
  });
});
