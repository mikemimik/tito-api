'use strict';

const proxyquire = require('proxyquire');
const test = require('tape');

const Tickets = proxyquire('../../lib/tickets', {
  'request-promise': (options) => {
    return Promise.resolve({});
  }
});

test('Ticket Class Constructor', (t) => {
  t.throws(
    () => new Tickets(),
    /missing.param.OPTIONS/,
    'should throw if missing options param'
  );
  t.throws(
    () => new Tickets({}),
    /missing.option.URI/,
    'should throw if missing URI option'
  );

  t.equals(
    new Tickets({ uri: 'a' }).resource,
    'tickets',
    'should have a resource property equal to \'tickets\''
  );

  t.deepEquals(
    new Tickets({ defaultRequestOptions: { headers: {} }, uri: 'a' }).requestOptions,
    { headers: {} },
    'should set requestOptions property equal to defaultRequestOptions passed in'
  );

  t.equals(
    new Tickets({ uri: 'set-uri' }).uri,
    'set-uri',
    'should set uri property equal to uri passed in'
  );

  t.end();
});

test('Tickets Class Create Method', (t) => {
  t.end();
});

test('Tickets Class Get Method', (t) => {
  t.end();
});

test('Tickets Class List Method', (t) => {
  t.end();
});

test('Tickets Class Update Method', (t) => {
  t.end();
});

test('Tickets Class Delete Method', (t) => {
  t.end();
});
