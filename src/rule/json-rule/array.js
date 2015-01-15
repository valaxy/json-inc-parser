define(function (require, exports) {
	var Role = require('./../role')
	var rule = require('./../rule')

	exports.init = function () {
		var roles = Role.createMany(6)
		Role.init(roles, [
			[0, null, [null, null, null, null, null, null, null, null, null, roles[1]]],
			[1, rule.parts[9], [null, null, null, null, roles[2], null, roles[5]]],
			[2, rule.parts[14], [null, null, null, null, null, null, roles[5], roles[3]]],
			[3, rule.parts[7], [null, null, null, null, roles[4]]],
			[4, rule.parts[14], [null, null, null, null, null, null, roles[5], roles[3]]],
			[5, rule.parts[10]]
		])
		return {roles: roles}
	}

})