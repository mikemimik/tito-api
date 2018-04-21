'use strict';

class Activity {
  constructor (options) {
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
      startTime
    } = options;
    this.id = id || null;
    this.capacity = capacity || 0; // INTEGER
    this.date = date || ''; // DATE
    this.description = description || ''; // STRING
    this.endTime = endTime || ''; // TIME
    this.name = name || ''; // STRING
    this.private = isPrivate || false; // BOOLEAN
    this.questionIds = questionIds || []; // ARRAY
    this.releaseIds = releaseIds || []; // ARRAY
    this.startTime = startTime || ''; // TIME
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
      startTime: attributes['start-time']
    };
    return new Activity(options);
  }
}

module.exports = Activity;
