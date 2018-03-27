'use strict';

const proxyquire = require('proxyquire').noCallThru();
const test = require('blue-tape');

const Events = proxyquire('../../lib/events', {
  'request-promise': (options) => new Promise((resolve, reject) => {
    return (options.bail) ? reject(options) : resolve(options);
  }),
  '../src/logger': {
    getLogger: (level) => ({
      silly: () => {},
      debug: () => {},
      error: () => {}
    })
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

test('Events Class Create Method Validation', (t) => {
  const options = { defaultRequestOptions: {}, uri: 'api/team' };

  t.throws(
    () => new Events(options).create(),
    /missing.param.DATA/,
    'should throw if missing data param'
  );

  t.throws(
    () => new Events(options).create({}),
    /missing.option.TITLE/,
    'should throw if missing title option'
  );

  t.throws(
    () => new Events(options).create({ title: 'a' }),
    /missing.option.STARTDATE/,
    'should throw if missing startData option'
  );

  t.throws(
    () => new Events(options).create({ title: 'a', startDate: '2000-01-01' }),
    /missing.option.ENDDATE/,
    'should throw if missing endDate option'
  );

  t.end();
});

test('Events Class Create Method Promises', (t) => {
  const options = { defaultRequestOptions: {}, uri: 'api/team' };

  return Promise.all([
    new Events(options)
      .create({
        title: 'Some Event',
        startDate: '2000-01-01',
        endDate: '2000-01-02',
        bail: false // USED FOR TESTING ONLY
      })
      .then((output) => {
        t.ok(output.method, 'should have a method property');
        t.equals(output.method, 'post', 'should have a method value of POST');

        t.ok(output.url, 'should have a url property');
        t.equals(output.url, 'api/team/events', 'should have a compused url');

        t.ok(output.headers['Content-Type'], 'should have a Content-Type property');
        t.equals(
          output.headers['Content-Type'],
          'application/json',
          'should have a Content-Type value of application/json'
        );
      })
  ]);
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
