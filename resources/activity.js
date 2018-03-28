'use strict';

class Activity {
  constructor (options) {
    this.capacity = 0; // INTEGER
    this.date = ''; // DATE
    this.description = ''; // STRING
    this.endTime = ''; // TIME
    this.name = ''; // STRING
    this.private = false; // BOOLEAN
    this.questionIds = []; // ARRAY
    this.releaseIds = []; // ARRAY
    this.startTime = ''; // TIME
  }
}

module.exports = Activity;
