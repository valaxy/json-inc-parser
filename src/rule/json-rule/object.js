define(function (require, exports) {
	// object = BEGIN_OBJECT (member (VALUE_SEPARATOR member)*)? END_OBJECT
	//          1             2       3               4          5

	//var Node = require('../../ast/node')
	//var Token = require('../../model/token')
	var Role = require('./../role')
	var rule = require('./../rule')

	//exports.role = [{
	//	process: function (token) {
	//
	//	},
	//	// 特例
	//	// a = "[" | b
	//	// b = "{"
	//	processNoCheck: function (token) {
	//		var node = Node.create()
	//		node.addChild(token)
	//		return node
	//	},
	//	isEnd: function () {
	//		return false
	//	}
	//}, {
	//	process: function (token) {
	//		if (token.type() == Token.String) {
	//			return parser.member.role[0].processNoCheck(token)
	//		} else if (token.type() == Token.ObjectEnd) {
	//			return token
	//		} else {
	//			return null
	//		}
	//	},
	//	isEnd: function () {
	//		return false
	//	}
	//}]

	exports.init = function () {
		var roles = Role.createMany(6)
		Role.init(roles, [
			0, null, [null, null, null, null, null, roles[1]],
			1, rule.parts[5], [null, null, null, null, roles[2], null, roles[5]],
			2, rule.parts[12], [null, null, null, null, null, null, roles[5], roles[3]],
			3, rule.parts[7], [null, null, null, null, roles[4]],
			4, rule.parts[12], [null, null, null, null, null, null, roles[5], roles[3]],
			5, rule.parts[6], []
		])
		return {roles: roles}
	}

})