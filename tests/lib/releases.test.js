'use strict';

const proxyquire = require('proxyquire').noCallThru();
const test = require('blue-tape');

const Releases = proxyquire('../../lib/releases', {
  'request-promise': (options) => Promise.resolve({}),
  '../src/logger': {
    getLogger: (level) => ({
      silly: () => {},
      debug: () => {},
      error: () => {},
    }),
  },
});

test('Releases Class Constructor', (t) => {
  t.throws(
    () => new Releases(),
    /missing.param.OPTIONS/,
    'should throw if missing options param'
  );
  t.throws(
    () => new Releases({}),
    /missing.option.URI/,
    'should throw if missing URI option'
  );

  t.equals(
    new Releases({ uri: 'a' }).resource,
    'releases',
    'should have a resource property equal to \'releases\''
  );

  t.deepEquals(
    new Releases({ defaultRequestOptions: { headers: {} }, uri: 'a' }).requestOptions,
    { headers: {} },
    'should set requestOptions property equal to defaultRequestOptions passed in'
  );

  t.equals(
    new Releases({ uri: 'set-uri' }).uri,
    'set-uri',
    'should set uri property equal to uri passed in'
  );

  t.end();
});

test('Releases Class Create Method', (t) => {
  t.end();
});

test('Releases Class Get Method', (t) => {
  t.end();
});

test('Releases Class List Method', (t) => {
  t.end();
});

test('Releases Class Update Method', (t) => {
  t.end();
});

test('Releases Class Delete Method', (t) => {
  t.end();
});
