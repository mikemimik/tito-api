'use strict';

class Activity {
  constructor (options) {
    const {
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
    this.capacity = capacity || 0; // INTEGER
    this.date = date || ''; // DATE
    this.description = description || ''; // STRING
    this.endTime = endTime || ''; // TIME
    this.name = name || ''; // STRING
    this.private = isPrivate || false; // BOOLEAN
    this.questionIds = questionIds || []; // ARRAY
    this.releaseIds = releaseIds || []; // ARRAY
    this.startTime = startTime || ''; // TIME
  }
}

module.exports = Activity;
