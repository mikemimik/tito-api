'use strict';

class Activity {
  constructor (options, fromSelf = false) {
    const {
      id,
      type,
      capacity,
      date,
      description,
      endTime,
      name,
      isPrivate,
      questionIds,
      releaseIds,
      startTime,
    } = options;
    this.id = id || null;
    this.capacity = capacity || 0; // INTEGER
    if (!fromSelf && !date) {
      throw new Error('missing.option.DATE');
    }
    this.date = date || ''; // DATE - REQUIRED
    this.description = description || ''; // STRING
    if (!fromSelf && !endTime) {
      throw new Error('missing.option.ENDTIME');
    }
    this.endTime = endTime || ''; // TIME - REQUIRED
    if (!fromSelf && !name) {
      throw new Error('missing.option.NAME');
    }
    this.name = name || ''; // STRING - REQUIRED
    this.private = isPrivate || false; // BOOLEAN
    this.questionIds = questionIds || []; // ARRAY
    this.releaseIds = releaseIds || []; // ARRAY
    if (!fromSelf && !startTime) {
      throw new Error('missing.option.STARTTIME');
    }
    this.startTime = startTime || ''; // TIME - REQUIRED
    this.type = type || 'activities';
  }

  static from (incoming) {
    // const { id, type, attributes, links, relationships } = incoming;
    const { id, type, attributes } = incoming;
    const { capacity, date, description, name } = attributes;
    const options = {
      id,
      type,
      capacity,
      date,
      description,
      endTime: attributes['end-time'],
      name,
      isPrivate: attributes['private'],
      questionIds: attributes['question-ids'],
      releaseIds: attributes['release-ids'],
      startTime: attributes['start-time'],
    };
    return new Activity(options, true);
  }
}

module.exports = Activity;
