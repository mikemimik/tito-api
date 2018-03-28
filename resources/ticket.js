'use strict';

const TICKET_STATE = {
  'NEW': 0,
  'COMPLETE': 1,
  'INCOMPLETE': 2,
  'REMINDER': 3,
  'VOID': 4
};

class Ticket {
  constructor (options) {
    this.answers = {}; // HASH
    this.companyName = ''; // STRING
    this.email = ''; // STRING
    this.name = ''; // STRING
    this.number = 1; // INTEGER
    this.phoneNumber = ''; // STRING
    this.price = 0.0; // DECIMAL
    this.reference = ''; // STRING
    this.state = TICKET_STATE.NEW; // ENUM
    this.tags = []; // STRING[]
    this.temporary = false; // BOOLEAN
    this.testMode = false; // BOOLEAN
  }
}

module.exports = Ticket;
