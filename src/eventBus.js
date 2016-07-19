var EventEmitter = require('events').EventEmitter

var eventBus = Object.assign({}, EventEmitter.prototype)

module.exports = eventBus
