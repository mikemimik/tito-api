'use strict';

const _ = require('lodash');

class Event {
  constructor (options, fromSelf = false) {
    const {
      id,
      type,
      bannerUrl,
      currency,
      description,
      endDate,
      live,
      location,
      logoUrl,
      isPrivate,
      slug,
      startDate,
      testMode,
      title
    } = options;
    // TODO(mperrotte): validation for this resource
    this.id = id || null;
    this.type = type || 'events';
    this.bannerUrl = bannerUrl || ''; // URL
    this.currency = currency || ''; // STRING
    this.description = description || ''; // MARKDOWN
    if (!fromSelf && !endDate) {
      throw new Error('missing.option.ENDDATE');
    }
    this.endDate = endDate || ''; // DATE - REQUIRED
    this.live = live || false; // BOOLEAN
    this.location = location || ''; // STRING
    this.logoUrl = logoUrl || ''; // URL
    this.private = isPrivate || false; // BOOLEAN
    if (!fromSelf && !title) {
      throw new Error('missing.option.TITLE');
    }
    this.title = title || 'no-title'; // STRING - REQUIRED
    this.slug = slug || _.kebabCase(title); // STRING - REQUIRED
    if (!fromSelf && !startDate) {
      throw new Error('missing.option.STARTDATE');
    }
    this.startDate = startDate || ''; // DATE - REQUIRED
    this.testMode = testMode || false; // BOOLEAN
  }

  static from (incoming) {
    // const { id, type, attributes, links, relationships } = incoming;
    const { id, type, attributes } = incoming;
    const { currency, description, live, location, slug, title } = incoming;
    const options = {
      id,
      type,
      bannerUrl: attributes['banner-url'],
      currency,
      description,
      endDate: attributes['end-date'],
      live,
      location,
      logoUrl: attributes['logo-url'],
      isPrivate: attributes['private'],
      slug,
      startDate: attributes['start-date'],
      testMode: attributes['test-mode'],
      title
    };
    return new Event(options, true);
  }
}

module.exports = Event;
