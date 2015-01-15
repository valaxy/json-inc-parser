define(function () {
	var Token = function () {
		this._type = -1
		this._parent = null
	}

	Token.create = function (type) {
		var token = new Token
		token._type = type
		return token
	}

	Token.prototype.type = function () {
		return this._type
	}

	Token.False = 0
	Token.Null = 1
	Token.True = 2
	Token.Number = 3
	Token.String = 4
	Token.ObjectBegin = 5
	Token.ObjectEnd = 6
	Token.ArrayBegin = 7
	Token.ArrayEnd = 8

	return Token
})