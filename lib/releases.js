'use strict';

const request = require('request-promise');
const logger = require('../src/logger').getLogger('debug');
const _ = require('lodash');

class Releases {
  constructor (options) {
    if (!options) { throw new Error('missing.param.OPTIONS'); }
    const { defaultRequestOptions, uri } = options;
    if (!uri) { throw new Error('missing.option.URI'); }
    this.resource = 'releases';
    this.uri = uri;
    this.requestOptions = defaultRequestOptions;
    logger.silly('Successfully created Releases resource');
  }

  // NOTE(mperrotte): Posting structure?
  // {
  //   "data":{
  //     "type":"releases",
  //     "attributes":{
  //       "title":"Awesome Conf"
  //     }
  //   }
  // }

  create (data) {
    logger.debug('release/create.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    const {
      event,
      archived = false,
      defaultQuantity = 0,
      description = '',
      endAt,
      startAt,
      maxTicketsPerPerson,
      minTicketsPerPerson,
      price,
      quantity,
      questionIds,
      requireEmail = true,
      requireName = true,
      title,
      enableWaitList,
    } = data;

    // TODO(mperrotte): add validation
    const endpoint = `/${event.attributes.slug}/${this.resource}`;
    const payload = {
      data: {
        type: this.resource,
        attributes: {
          archived,
          'default-quantity': defaultQuantity,
          description,
          'end-at': endAt,
          'start-at': startAt,
          'max-tickets-per-person': maxTicketsPerPerson,
          'min-tickets-per-person': minTicketsPerPerson,
          price,
          quantity,
          'question-ids': questionIds,
          'require-email': requireEmail,
          'require-name': requireName,
          title,
          'waiting-list-enabled-during-sold-out': enableWaitList,
        },
      },
    };
    const options = {
      method: 'post',
      url: this.uri + endpoint,
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        logger.debug('release/create.success:', res);
        return res;
      })
      .catch((err) => {
        logger.error('release/create.error:', err);
        throw new Error('release/create.error');
      });
  }

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
      url: this.uri + endpoint,
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
      url: this.uri + endpoint,
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
