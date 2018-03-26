'use strict';

const proxyquire = require('proxyquire');
const test = require('tape');

const Events = proxyquire('../../lib/events', {
  'request-promise': (options) => {
    return Promise.resolve({});
  }
});

test('Events Class Constructor', (t) => {
  t.throws(
    () => new Events(),
    /missing.param.OPTIONS/,
    'should throw if missing options param'
  );
  t.throws(
    () => new Events({}),
    /missing.option.URI/,
    'should throw if missing URI option'
  );

  t.equals(
    new Events({ uri: 'a' }).resource,
    'events',
    'should have a resource property equal to \'events\''
  );

  t.deepEquals(
    new Events({ defaultRequestOptions: { headers: {} }, uri: 'a' }).requestOptions,
    { headers: {} },
    'should set requestOptions property equal to defaultRequestOptions passed in'
  );

  t.equals(
    new Events({ uri: 'set-uri' }).uri,
    'set-uri',
    'should set uri property equal to uri passed in'
  );

  t.end();
});

test('Events Class Create Method', (t) => {
  t.end();
});

test('Events Class Get Method', (t) => {
  t.end();
});

test('Events Class GetLatest Method', (t) => {
  t.end();
});

test('Events Class List Method', (t) => {
  t.end();
});

test('Events Class Update Method', (t) => {
  t.end();
});

test('Events Class Delete Method', (t) => {
  t.end();
});
