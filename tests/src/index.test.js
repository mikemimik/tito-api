'use strict';

const proxyquire = require('proxyquire').noCallThru();
const test = require('blue-tape');

class Mock {
  constructor (incoming) {
    Object.keys(incoming).forEach(key => {
      this[key] = incoming[key];
    });
  }
}

const TitoApi = proxyquire('../../src/index', {
  '../lib/tickets': function mock (innerOptions) { return new Mock(innerOptions); },
  '../lib/events': function mock (innerOptions) { return new Mock(innerOptions); },
  '../lib/releases': function mock (innerOptions) { return new Mock(innerOptions); }
});

test('TitoApi Class Constructor', (t) => {
  t.throws(
    () => new TitoApi(),
    /missing.param.OPTIONS/,
    'should throw if missing options param'
  );

  t.throws(
    () => new TitoApi({ apiKey: 'a' }),
    /missing.option.TEAM/,
    'should throw if missing team option'
  );

  t.throws(
    () => new TitoApi({ team: 'a' }),
    /missing.option.APIKEY/,
    'should throw if missing apiKey option'
  );

  const innerOptionExpectation = {
    defaultRequestOptions: {
      headers: {
        'Authorization': 'Token token=token',
        'Accept': 'application/vnd.api+json'
      },
      json: true
    },
    team: 'main',
    uri: 'https://api.tito.io/v2/main'
  };

  t.deepEquals(
    new TitoApi({ team: 'main', apiKey: 'token' }).tickets,
    innerOptionExpectation,
    'should construct innerOptions correctly - tickets'
  );

  t.deepEquals(
    new TitoApi({ team: 'main', apiKey: 'token' }).events,
    innerOptionExpectation,
    'should construct innerOptions correctly - events'
  );

  t.deepEquals(
    new TitoApi({ team: 'main', apiKey: 'token' }).releases,
    innerOptionExpectation,
    'should construct innerOptions correctly - releases'
  );

  t.end();
});
