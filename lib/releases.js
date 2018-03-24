'use strict';

const request = require('request-promise');
const logger = require('../src/logger').getLogger('debug');
const _ = require('lodash');

class Releases {
  constructor (options) {
    if (!options) { throw new Error('missing.param.OPTIONS'); }
    const { defaultRequestOptions, uri } = options;
    if (!uri) { throw new Error('missing.param.URI'); }
    this.resource = 'releases';
    this.uri = uri;
    this.requestOptions = defaultRequestOptions;
    logger.silly('Successfully created Releases resource');
  }

  create (data) {}

  get (data) {}

  list (data) {}

  update (data) {
    logger.debug('release/update.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }

  delete (data) {
    logger.debug('release/delete.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }
}

module.exports = Releases;
