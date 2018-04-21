'use strict';

const request = require('request-promise');
const logger = require('../src/logger').getLogger('debug');
const _ = require('lodash');

const { CheckIn, CheckinList, Event, Ticket } = require('../resources');

class CheckIns {
  constructor (options) {
    if (!options) { throw new Error('missing.param.OPTIONS'); }
    const { defaultRequestOptions, uri } = options;
    if (!uri) { throw new Error('missing.option.URI'); }
    this.resource = 'checkins';
    this.uri = uri;
    this.requestOptions = defaultRequestOptions || {};
    logger.silly('Successfullly created CheckIns resource');
  }

  create (data) {
    logger.debug('checkins/create.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    const { checkin, event, checkinList, ticket } = data;

    // {
    //   "data": {
    //     "type":"checkins",
    //     "attributes": {
    //       "created-at":"2016-12-01T08:30:00"
    //     },
    //     "relationships": {
    //       "checkin-list": {
    //         "data": {
    //           "type":"checkin-lists",
    //           "id":"awesomeconf-check-in-list"
    //         }
    //       },
    //       "ticket": {
    //         "data": {
    //           "type":"tickets",
    //           "id":"paul-awesomeconf-ticket"
    //         }
    //       }
    //     }
    //   }
    // }
    // INFO(mperrotte): incoming param validation
    if (!event) {
      throw new Error('missing.options.EVENT');
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
    if (!checkin) {
      throw new Error('missing.option.CHECKIN');
    } else {
      if (!(checkin instanceof CheckIn)) {
        throw new Error('invalid.type.CHECKIN');
      }
    }
    if (!ticket) {
      throw new Error('missing.option.TICKET');
    } else {
      if (!(ticket instanceof Ticket)) {
        throw new Error('invalid.type.TICKET');
      }
    }

    const endpoint = `/${event.slug}/checkin_lists/${checkinList.id}/checkins`;
    const payload = {
      data: {
        type: this.resource,
        attributes: {
          'created-at': checkin.createdAt
        },
        relationships: {
          'checkin-list': {
            data: {
              type: checkinList.type,
              id: checkinList.id
            }
          },
          ticket: {
            data: {
              type: ticket.type,
              id: ticket.id
            }
          }
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

      })
      .catch((err) => {
        logger.error('checkin/create.error:', err);
        throw new Error('checkin/create.error');
      });
  }

  get (data) {
    logger.debug('checkins/get.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }

  list (data) {
    logger.debug('checkins/list.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    const { event, checkinList } = data;

    // INFO(mperrotte): incoming param validation
    if (!event) {
      throw new Error('missing.options.EVENT');
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

    const endpoint = `/${event.slug}/checkin_lists/${checkinList.id}/checkins`;
    const options = {
      method: 'get',
      url: this.uri + endpoint
    };
    return request(_.merge(this.requestOptions, options))
      .then((res) => {
        logger.debug('checkins/list.success:', res);
        const { data } = res;
        if (data) {
          return data.map((item) => {
            return CheckIn.from(item);
          });
        }
        return [];
      })
      .catch((err) => {
        logger.error('checkin/list.error:', err);
        throw new Error('checkin/list.error');
      });
  }

  update (data) {
    logger.debug('checkins/update.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }

  delete (data) {
    logger.debug('checkins/delete.entry:', data);

    // INFO(mperrotte): initial param validation
    if (!data) { throw new Error('missing.param.DATA'); }
    throw new Error('not.implemented');
  }
}

module.exports = CheckIns;
