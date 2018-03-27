'use strict';

const test = require('blue-tape');

const logger = require('../../src/logger');

test('Logger', (t) => {
  t.throws(
    logger.getLogger,
    /invalid.function.call/,
    'should throw if no log level is provided'
  );

  const a = logger.getLogger('debug');
  t.equals(
    typeof a.debug,
    'function',
    'should have debug function if level was set to debug'
  );

  t.equals(
    typeof a.error,
    'function',
    'should have error function if level was set to debug'
  );

  t.equals(
    typeof a.silly,
    'function',
    'should have silly function if level was set to debug'
  );
  t.end();
});
