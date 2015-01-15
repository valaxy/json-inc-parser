define(function (require, exports) {
	var Role = require('./../role')
	var rule = require('./../rule')

	exports.init = function () {
		var roles = Role.createMany(4)
		Role.init(roles, [
			[0, null, [null, null, null, null, roles[1]]],
			[1, rule.parts[4], [null, null, null, null, null, null, null, null, roles[2]]],
			[2, rule.parts[8], [null, roles[3], roles[3], roles[3], roles[3], roles[3], null, null, null, roles[3]]],
			[3, rule.parts[14], []]
		])
		return {roles: roles}
	}

})