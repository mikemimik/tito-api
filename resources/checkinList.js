'use strict';

class CheckinList {
  constructor (options, fromSelf = false) {
    const {
      id,
      type,
      activityIds,
      expiresAt,
      questionIds,
      releaseIds,
      showCompanyName,
      showEmail,
      showPhoneNumber,
      title
    } = options;
    this.id = id || null;
    this.type = type || 'checkin-lists';
    this.activityIds = activityIds || []; // ARRAY
    this.expiresAt = expiresAt || ''; // DATETIME
    this.questionIds = questionIds || []; // ARRAY
    this.releaseIds = releaseIds || []; // ARRAY
    this.showCompanyName = showCompanyName || false; // BOOLEAN
    this.showEmail = showEmail || false; // BOOLEAN
    this.showPhoneNumber = showPhoneNumber || false; // BOOLEAN
    if (!fromSelf && !title) {
      throw new Error('missing.option.TITLE');
    }
    this.title = title || 'no-title'; // STRING - REQUIRED
  }

  static from (incoming) {
    // const { id, type, attributes, links, relationships } = incoming;
    const { id, type, attributes } = incoming;
    const { title } = attributes;
    const options = {
      id,
      type,
      activityIds: attributes['activity-ids'],
      expiresAt: attributes['expires-at'],
      questionIds: attributes['question-ids'],
      releaseIds: attributes['release-ids'],
      showCompanyName: attributes['show-company-name'],
      showEmail: attributes['show-email'],
      showPhoneNumber: attributes['show-phone-number'],
      title
    };
    return new CheckinList(options, true);
  }
}

module.exports = CheckinList;
