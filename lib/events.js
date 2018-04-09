'use strict';

const request = require('request-promise');
const logger = require('../src/logger').getLogger('debug');
const _ = require('lodash');

class Events {
  constructor (options) {
    if (!options) { throw new Error('missing.param.OPTIONS'); }
    const { defaultRequestOptions, uri } = options;
    if (!uri) { throw new Error('missing.option.URI'); }
    this.resource = 'events';
    this.uri = uri;
    this.requestOptions = defaultRequestOptions;
    logger.silly('Successfully created Event resource');
  }

  // NOTE(mperrotte): Posting structure?
  // {
  //   "data":{
  //     "type":"events",
  //     "attributes":{
  //       "slug":"Awesome-conf",
  //       "title":"Awesome Conf"
  //     }
  //   }
  // }

  create (data) {
    logger.debug('events/create.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }

    let { slug } = data;
    const {
      title,
      description = '',
      startDate,
      endDate,
      location = '',
      live = false
    } = data;

    // INFO(mperrotte): incoming param validation
    if (!title) { throw new Error('missing.option.TITLE'); }
    if (!startDate) { throw new Error('missing.option.STARTDATE'); }
    if (!endDate) { throw new Error('missing.option.ENDDATE'); }
    if (!slug) {
      slug = _.kebabCase(title);
    }

    const endpoint = `/${this.resource}`;
    const payload = {
      data: {
        type: this.resource,
        attributes: {
          slug,
          title,
          description,
          'start-date': startDate,
          'end-date': endDate,
          live,
          location
        }
      }
    };
    const options = {
      method: 'post',
      url: this.uri + endpoint,
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        logger.debug('events/create.success:', res);
        return res;
      })
      .catch((err) => {
        logger.error('events/create.error', err);
        throw new Error('events/create.error');
      });
  }

  get (data) {
    logger.debug('events/get.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    const { event } = data;

    // INFO(mperrotte): incoming param validation
    if (!event) { throw new Error('missing.option.EVENT'); }
    if (event && !event.id) { throw new Error('missing.option.EVENT:ID'); }
    const endpoint = `/${event.id}`;
    const options = {
      method: 'get',
      url: this.uri + endpoint
    };
    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        logger.debug('events/get.success:', res);
        return res;
      })
      .catch((err) => {
        logger.error('events/get.error:', err);
        throw new Error('events/get.error');
      });
  }

  getLatest () {
    logger.debug('events/getLatest.entry');

    const endpoint = `/${this.resource}`;
    const options = {
      method: 'get',
      url: this.uri + endpoint
    };

    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        const sortedEvents = _.chain(res.data)
          .filter((e) => (e.attributes['start-date'] || e.attributes['end-date']))
          .sortBy(
            [
              (event) => {
                const date = (event.attributes['start-date'])
                  ? event.attributes['start-date']
                  : event.attributes['end-date'];
                const year = (date) ? date.split('-')[0] : null;
                if (!year) {
                  logger.debug(
                    'events/getLatest.DATA:DATA:EVENTS[]:ATTRIBUTES.error:',
                    event.attributes
                  );
                }
                return year;
              },
              (event) => {
                const date = (event.attributes['start-date'])
                  ? event.attributes['start-date']
                  : event.attributes['end-date'];
                const month = (date) ? date.split('-')[1] : null;
                if (!month) {
                  logger.debug(
                    'events/getLatest.DATA:DATA:EVENTS[]:ATTRIBUTES.error:',
                    event.attributes
                  );
                }
                return month;
              }
            ]
          )
          .value();
        const latestEvent = sortedEvents.pop();
        return latestEvent;
      })
      .catch((err) => {
        logger.error('events/getLatest.error:', err);
        throw new Error('events/getLatest.error');
      });
  }

  list () {
    logger.debug('events/list.entry');

    const endpoint = `/${this.resource}`;
    const options = {
      method: 'get',
      url: this.uri + endpoint
    };
    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        logger.debug('events/list.success:', res);
        return res;
      })
      .catch((err) => {
        logger.error('events/list.error:', err);
        throw new Error('events/list.error');
      });
  }

  update (data) {
    logger.debug('events/update.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }
  delete (data) {
    logger.debug('events/delete.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }
}

module.exports = Events;
