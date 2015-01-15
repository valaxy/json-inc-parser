define(function () {
	var Token = function () {
		this._type = -1
		this._parent = null
		this._value = null
	}

	Token.create = function (type, value) {
		var token = new Token
		token._type = type
		token._valu = value
		return token
	}

	Token.prototype.type = function () {
		return this._type
	}

	Token.prototype.value = function () {
		return this._value
	}

	Token.Type = {
		BOOLEAN: 1,
		NULL: 2,
		NUMBER: 3,
		STRING: 4,
		BEGIN_OBJECT: 5,
		END_OBJECT: 6,
		COMMA: 7,
		NAME_SEPARATOR: 8,
		BEGIN_ARRAY: 9,
		END_ARRAY: 10
	}

	return Token
})