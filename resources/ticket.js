'use strict';

const TICKET_STATE = {
  'NEW': 0,
  'COMPLETE': 1,
  'INCOMPLETE': 2,
  'REMINDER': 3,
  'VOID': 4
};

class Ticket {
  constructor (options, fromSelf = false) {
    const {
      id,
      type,
      answers,
      companyName,
      email,
      name,
      number,
      phoneNumber,
      price,
      reference,
      state,
      tags,
      temporary,
      testMode
    } = options;
    this.answers = answers || {}; // HASH
    this.companyName = companyName || ''; // STRING
    if (!fromSelf && !email) {
      throw new Error('missing.option.EMAIL');
    }
    this.email = email || 'no-email'; // STRING - REQUIRED
    if (!fromSelf && !name) {
      throw new Error('missing.option.NAME');
    }
    this.name = name || 'no-name'; // STRING - REQUIRED
    if (!fromSelf && !number) {
      throw new Error('missing.option.NUMBER');
    }
    this.number = number; // INTEGER
    this.phoneNumber = phoneNumber || ''; // STRING
    this.price = price || 0.0; // DECIMAL
    this.reference = reference || ''; // STRING
    this.state = TICKET_STATE[state] || TICKET_STATE.NEW; // ENUM - REQUIRED
    this.tags = tags || []; // STRING[]
    this.temporary = temporary || false; // BOOLEAN
    this.testMode = testMode || false; // BOOLEAN
  }

  static from (incoming) {
    // const { id, type, attributes, links, relationships } = incoming;
    const { id, type, attributes } = incoming;
    const {
      answers,
      email,
      name,
      number,
      price,
      reference,
      state,
      tags,
      temporary
    } = attributes;
    const options = {
      id,
      type,
      answers,
      companyName: attributes['company-name'],
      email,
      name,
      number,
      phoneNumber: attributes['phone-number'],
      price,
      reference,
      state,
      tags,
      temporary,
      testMode: attributes['test-mode']
    };
    return new Ticket(options, true);
  }
}

module.exports = Ticket;
