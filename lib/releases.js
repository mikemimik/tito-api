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

  get (data) {
    logger.debug('release/get.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    const { event, eventId } = data;

    // INFO(mperrotte): incoming param validation
    if (!event) { throw new Error('missing.option.EVENT'); }
    if (event && !event.attributes) {
      throw new Error('missing.option.EVENT:ATTRIBUTES');
    }
    if (!eventId) { throw new Error('missing.option.EVENTID'); }
    
    const endpoint = `/${event.attributes.slug}/${this.resource}/${eventId}`;
    const options = {
      method: 'get',
      url: this.uri + endpoint
    };
    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        logger.debug('release/get.success:', res);
        return res;
      })
      .catch((err) => {
        logger.error('release/get.error:', err);
        throw new Error('release/get.error');
      });
  }

  list (data) {
    logger.debug('release/list.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    const { event } = data;

    // INFO(mperrotte): incoming param validation
    if (!event) { throw new Error('missing.option.EVENT'); }
    if (event && !event.attributes) {
      throw new Error('missing.option.EVENT:ATTRIBUTES');
    }

    const endpoint = `/${event.attributes.slug}/${this.resource}`;
    const options = {
      method: 'get',
      url: this.uri + endpoint
    };
    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        logger.debug('release/list.success:', res);
        return res;
      })
      .catch((err) => {
        logger.error('release/list.error:', err);
        throw new Error('release/list.error');
      });
  }

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
