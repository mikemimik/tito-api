'use strict';

class Event {
  constructor (options) {
    // TODO(mperrotte): validation for this resource
    this.bannerUrl = ''; // URL
    this.currency = ''; // STRING
    this.description = ''; // MARKDOWN
    this.endDate = ''; // DATE - REQUIRED
    this.live = false; // BOOLEAN
    this.location = ''; // STRING
    this.logoUrl = ''; // URL
    this.private = false; // BOOLEAN
    this.slug = ''; // STRING - REQUIRED
    this.startDate = ''; // DATE - REQUIRED
    this.testMode = false; // BOOLEAN
    this.title = ''; // STRING - REQUIRED
  }
}

module.exports = Event;
