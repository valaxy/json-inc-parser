define(function (require, exports) {
	var rule = require('../rule')

	exports.init = function () {
		rule.array = require('./array').init()
		rule.object = require('./object').init()
		rule.member = require('./member').init()
		rule.value = require('./value').init()
	}

})