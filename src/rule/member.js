define(function (require, exports) {
	// member = STRING NAME_SEPARATOR value

	var Role = require('./role')
	var rule = require('./rule')

	var roles = exports.roles = Role.createMany(4)
	Role.init(roles, [
		[0, null, [null, null, null, null, roles[1]]],
		[1, rule.parts[4], [null, null, null, null, null, null, null, null, roles[2]]],
		[2, rule.parts[8], [null, roles[3], roles[3], roles[3], roles[3], roles[3], null, null, null, roles[3]]],
		[3, rule.parts[14], []]
	])

	if (typeof QUnit != 'undefined') {
		QUnit.module('member')

		QUnit.test('roles', function (assert) {
			assert.equal(exports.roles.length, 4)
		})
	}
})