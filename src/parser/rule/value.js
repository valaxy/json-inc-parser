define(function (require, exports) {
	// value = FALSE | NULL | TRUE | object | array | NUMBER | STRING

	var Token = require('../../model/token')
	var Role = require('./role')
	var rule = require('./rule')

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

	exports.role = [
		null,
		Role.create(1, []),
		Role.create(2, []),
		Role.create(3, [null, null, null, null, null, 5]),
		Role.create(4, [null, null, null, null, null, null, null, null, null, 9]),
		Role.create(5, []),
		Role.create(6, [])
	]

})