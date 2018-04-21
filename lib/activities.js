'use strict';

const request = require('request-promise');
const logger = require('../src/logger').getLogger('debug');
const _ = require('lodash');

const { Event, Activity } = require('../resources');

class Activities {
  constructor (options) {
    if (!options) { throw new Error('missing.param.OPTIONS'); }
    const { defaultRequestOptions, uri } = options;
    if (!uri) { throw new Error('missing.option.URI'); }
    this.resource = 'activities';
    this.uri = uri;
    this.requestOptions = defaultRequestOptions;
    logger.silly('Successfully created Activities resource');
  }

  create (data) {
    logger.debug('activities/create.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
  }

  get (data) {
    logger.debug('activities/get.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
  }

  list (data) {
    logger.debug('activities/list.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    const { event } = data;

    // INFO(mperrotte): incoming param validation
    if (!event) {
      throw new Error('missing.option.EVENT');
    } else {
      if (!(event instanceof Event)) {
        throw new Error('invalid.type.EVENT');
      }
    }

    const endpoint = `/${event.slug}/${this.resource}`;
    const options = {
      method: 'get',
      url: this.uri + endpoint
    };
    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        logger.debug('activities/list.success:', res);
        const { data } = res;
        if (data) {
          return data.map((item) => {
            return Activity.from(item);
          });
        }
        return [];
      })
      .catch((err) => {
        logger.error('activities/list.error:', err);
        throw new Error('activities/list.error');
      });
  }

  update (data) {
    logger.debug('activities/update.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }

  delete (data) {
    logger.debug('activities/delete.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }
}

module.exports = Activities;
