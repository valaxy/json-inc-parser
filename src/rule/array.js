define(function (require, exports) {
	// array = BEGIN_ARRAY[1] (value[2] *(COMMA[3] value[4]))? END_ARRAY[5]

	var Role = require('./role')
	var rule = require('./rule')

	var roles = exports.roles = Role.createMany(6)
	Role.init(roles, [
		[0, null, [null, null, null, null, null, null, null, null, null, roles[1]]],
		[1, rule.parts[9], [null, null, null, null, roles[2], null, roles[5]]],
		[2, rule.parts[14], [null, null, null, null, null, null, roles[5], roles[3]]],
		[3, rule.parts[7], [null, null, null, null, roles[4]]],
		[4, rule.parts[14], [null, null, null, null, null, null, roles[5], roles[3]]],
		[5, rule.parts[10]]
	])


	if (typeof QUnit != 'undefined') {
		QUnit.module('array')

		QUnit.test('roles', function (assert) {
			assert.equal(exports.roles.length, 6)
		})
	}
})