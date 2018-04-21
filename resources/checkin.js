'use strict';

class Checkin {
  constructor (options, fromSelf = false) {
    const {
      id,
      type,
      createdAt
    } = options;
    this.id = id || null;
    this.type = type || 'checkins';
    this.createdAt = (fromSelf)
      ? createdAt
      : new Date(); // DATETIME
  }

  static from (incoming) {
    // const { id, type, attributes, links, relationships } = incoming;
    const { id, type, attributes } = incoming;
    const options = {
      id,
      type,
      createdAt: attributes['created-at']
    };
    return new Checkin(options, true);
  }
}

module.exports = Checkin;
