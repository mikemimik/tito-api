'use strict';

const Tickets = require('../lib/tickets');
const Events = require('../lib/events');
const Releases = require('../lib/releases');

const api = 'https://api.tito.io/v2';

class TitoApi {
  constructor(options) {
    if (!options) {
      throw new Error('missing.param.OPTIONS');
    }
    const { team, apiKey } = options;
    if (!team) {
      throw new Error('missing.option.TEAM');
    }
    if (!apiKey) {
      throw new Error('missing.option.APIKEY');
    }

    const defaultRequestOptions = {
      headers: {
        'Authorization': `Token token=${apiKey}`,
        'Accept': 'application/vnd.api+json'
      },
      json: true
    };
    const innerOptions = {
      defaultRequestOptions,
      team,
      uri: `${api}/${team}`
    };
    this.tickets = new Tickets(innerOptions);
    this.events = new Events(innerOptions);
    this.releases = new Releases(innerOptions);
  }
}

module.exports = TitoApi;
