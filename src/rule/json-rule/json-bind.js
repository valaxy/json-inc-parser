define(function (require, exports) {
	var jsonParts = require('./json-parts')
	var jsonRoles = require('./json-roles')

	exports.bind = function () {
		jsonParts.build()
		jsonRoles.init() // no need for build
		jsonParts.init()
	}


	if (typeof QUnit != 'undefined') {
		QUnit.module('json-bind')

		QUnit.test('no throw', function (assert) {
			exports.bind()
			assert.ok(true)
		})
	}

})