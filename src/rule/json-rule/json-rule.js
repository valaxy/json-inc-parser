define(function (require, exports) {
	var jsonParts = require('./json-parts')
	var jsonRoles = require('./json-roles')
	var rule = require('../rule')

	exports.bind = function () {
		jsonParts.build()
		jsonRoles.init() // no need for build
		jsonParts.init()
	}


	if (typeof QUnit != 'undefined') {
		QUnit.module('json-rule')

		QUnit.test('no throw', function (assert) {
			exports.bind()
			assert.equal(rule.parts.length, 15)
			assert.equal(rule.value.roles.length, 7)
		})
	}

})