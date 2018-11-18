'use strict';

const proxyquire = require('proxyquire').noCallThru();
const test = require('blue-tape');

const Events = proxyquire('../../lib/events', {
  'request-promise': (options) => new Promise((resolve, reject) => {
    const { description } = options.body.data.attributes;
    return (description === 'fail this') ? reject(options) : resolve(options);
  }),
  '../src/logger': {
    getLogger: (level) => ({
      silly: () => {},
      debug: () => {},
      error: () => {},
    }),
  },
});

const Event = require('../../resources/event');

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
    /missing.option.EVENT/,
    'should throw if missing event property'
  );

  t.throws(
    () => new Events(options).create({ event: {} }),
    /invalid.type.EVENT/,
    'should throw if event object is not a class instances'
  );

  t.end();
});

// TODO(mperrotte): break out property checking into another test
test('Events Class Create Method', (t) => {
  const options = { defaultRequestOptions: {}, uri: 'api/team' };
  const event = new Event({
    title: 'Some Event',
    startDate: '2000-01-01',
    endDate: '2000-01-02',
  });
  const failEvent = new Event({
    title: 'Some Event',
    startDate: '2000-01-01',
    endDate: '2000-01-02',
    description: 'fail this',
  });

  return Promise.all([
    new Events(options)
      .create({ event })
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

        t.ok(output.body, 'should have a body property');
        const { data } = output.body;
        t.ok(data, 'should have a property data on body property');
        t.ok(data.type, 'should have a type property in data object');
        t.equal(
          data.type,
          'events',
          'should have a type equal to \'evnets\' in data object'
        );
        const { attributes } = data;
        t.ok(attributes, 'should have an attributes property in data object');
        t.equal(
          attributes.slug,
          'some-event',
          'should have a generated slug from title'
        );
      }),
    new Events(options)
      .create({ event: failEvent })
      .catch((output) => {
        t.ok(true, 'should throw on failure');
        t.equal(
          output.message,
          'events/create.error',
          'should throw with appropriate error message'
        );
      }),
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
