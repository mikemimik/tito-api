'use stict';

const proxyquire = require('proxyquire').noCallThru();
const test = require('blue-tape');

const Checkins = proxyquire('../../lib/checkins', {
  'request-promise': (options) => new Promise((resolve, reject) => {
    return resolve(options);
  }),
  '../src/logger': {
    getLogger: (level) => ({
      silly: () => {},
      debug: () => {},
      error: () => {}
    })
  }
});

const Checkin = require('../../resources/checkin');

test('Checkins Class Constructor', (t) => {
  t.throws(
    () => new Checkins(),
    /missing.param.OPTIONS/,
    'should throw if missing options param'
  );

  t.throws(
    () => new Checkins({}),
    /missing.option.URI/,
    'should throw if missing URI option'
  );

  t.equals(
    new Checkins({ uri: 'a' }).resource,
    'checkins',
    'should have a resourse property equal to \'checkins\''
  );

  t.equals(
    new Checkins({ uri: 'set-uri' }).uri,
    'set-uri',
    'should set uri property equal to uri passed in'
  );

  t.deepEquals(
    new Checkins({ defaultRequestOptions: { headers: {} }, uri: 'a' }).requestOptions,
    { headers: {} },
    'should set requestOptions property equal to defaultRequestOptions passed in'
  );

  t.end();
});

test('Checkins Class Create Method Validation', (t) => {
  t.end();
});

test('Checkins Class Create Method', (t) => {
  t.end();
});

test('Checkins Class Get Method', (t) => {
  t.end();
});

test('Checkins Class List Method', (t) => {
  t.end();
});

test('Checkins Class Update Method', (t) => {
  t.end();
});

test('Checkins Class Delete Method', (t) => {
  t.end();
});
