'use strict';

const request = require('request-promise');
const logger = require('../src/logger').getLogger('debug');
const _ = require('lodash');

const { CheckinList, Event } = require('../resources');

class CheckinLists {
  constructor (options) {
    if (!options) { throw new Error('missing.param.OPTIONS'); }
    const { defaultRequestOptions, uri } = options;
    if (!uri) { throw new Error('missing.option.URI'); }
    this.resource = 'checkin_list';
    this.uri = uri;
    this.requestOptions = defaultRequestOptions;
    logger.silly('Successfully created CheckinList resource');
  }

  // NOTE(mperrotte): Posting structure?
  // {
  //   "data":{
  //     "type":"checkin-lists",
  //     "attributes":{
  //       "title":"Day 2 Check-in List"
  //     }
  //   }
  // }

  create (data) {
    logger.debug('checkList/create.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
    // const {
    //   activityIds,
    //   expiresAt,
    //   questionIds,
    //   releaseIds,
    //   showCompanyName = false,
    //   showEmail = true,
    //   showPhoneNumber = false,
    //   title
    // } = data;

    // INFO(mperrotte): incoming param validation
    // if (!title) { throw new Error('missing.option.TITLE'); }
    // const endpoint = `/${event.attributes.slug}/${this.resource}`;
  }

  get (data) {
    logger.debug('checkinList/get.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    const { event, checkinList } = data;

    // INFO(mperrotte): incoming param validation
    if (!event) {
      throw new Error('missing.option.EVENT');
    } else {
      if (!(event instanceof Event)) {
        throw new Error('invalid.type.EVENT');
      }
    }
    if (!checkinList) {
      throw new Error('missing.option.CHECKINLIST');
    } else {
      if (!(checkinList instanceof CheckinList)) {
        throw new Error('invalid.type.CHECKINLIST');
      }
    }

    const endpoint = `/${event.slug}/${this.resource}/${checkinList.slug}`;
    const options = {
      method: 'get',
      url: this.uri + endpoint,
    };
    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        logger.debug('checkinList/get.success:', res);
        const { data } = res;
        if (data) {
          return CheckinList.from(data);
        }
        return null;
      })
      .catch((err) => {
        logger.error('checkinList/get.error:', err);
        throw new Error('checkinList/get.error');
      });
  }

  list (data) {
    logger.debug('checkinList/list.entry:', data);

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
      url: this.uri + endpoint,
    };
    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        logger.debug('checkinList/list.success:', res);
        const { data } = res;
        if (data) {
          return data.map((item) => {
            return CheckinList.from(item);
          });
        }
        return [];
      })
      .catch((err) => {
        logger.error('checkinList/list.error:', err);
        throw new Error('checkinList/list.error');
      });
  }

  update (data) {
    logger.debug('checkinList/update.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }

  delete (data) {
    logger.debug('checkinList/delete.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }
}

module.exports = CheckinLists;
