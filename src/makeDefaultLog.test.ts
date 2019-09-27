/* eslint-disable */
import 'jest';
import { makeDefaultLog } from './makeDefaultLog';

describe('makeDefaultLog', () => {
  it('defaults to info log level', () => {
    const target = makeMockLogTarget();
    const log = makeDefaultLog(target);

    log({ message: 'hello' });

    expect(target.info.mock.calls.length).toBe(1);

    expect(JSON.parse(target.info.mock.calls[0][0])).toEqual({
      level: 'info',
      message: 'hello',
    });
  });

  it('defaults to error log level for errors', () => {
    const target = makeMockLogTarget();
    const log = makeDefaultLog(target);

    log(new Error());

    expect(target.error.mock.calls.length).toBe(1);
    expect(JSON.parse(target.error.mock.calls[0][0]).level).toEqual('error');
  });

  it('serializes errors properly', () => {
    const target = makeMockLogTarget();
    const log = makeDefaultLog(target);

    const error = new Error();
    log(error);

    expect(target.error.mock.calls.length).toBe(1);
    expect(JSON.parse(target.error.mock.calls[0][0])).toEqual({
      level: 'error',
      message: error.message,
      stack: error.stack,
    });
  });
});

function makeMockLogTarget() {
  return {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}
