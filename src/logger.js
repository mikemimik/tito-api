'use strict';

const Winston = require('winston');

const DefaultTransport = new Winston.transports.Console({
  colorize: true,
  prettyPrint: true,
  depth: 3
});

exports.getLogger = (level) => {
  if (!level) throw new Error('invalid.function.call');

  return Winston.createLogger({
    level,
    transports: [ DefaultTransport ]
  });
};
