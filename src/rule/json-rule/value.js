define(function (require, exports) {
	// value = BOOLEAN[1] | NULL[2] | object[3] | array[4] | NUMBER[5] | STRING[6]

	var Token = require('../../model/token')
	var Role = require('./../role')
	var rule = require('./../rule')

	exports.process = function (tokenStream) {
		var token = tokenStream.look()
		if (token.type() == Token.False) {
			return token
		} else if (token.type() == Token.Null) {
			return token
		} else if (token.type() == Token.True) {
			return token
		} else if (token.type() == Token.Number) {
			return token
		} else if (token.type() == Token.String) {
			return token
		} else if (token.type() == Token.ObjectBegin) {
			return token
		} else if (token.type() == Token.ArrayBegin) {
			return token
		}
	}

	exports.init = function () {
		var roles = Role.createMany(7)
		Role.init(roles, [
			[0, null, [null, roles[1], roles[2], roles[5], roles[6], roles[3], null, null, null, roles[4]]],
			[1, rule.parts[1], []],
			[2, rule.parts[2], []],
			[3, rule.parts[11], []],
			[4, rule.parts[13], []],
			[5, rule.parts[3], []],
			[6, rule.parts[4], []]
		])
		return {roles: roles}
	}
})