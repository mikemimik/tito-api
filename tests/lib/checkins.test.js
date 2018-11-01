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
