define(function () {

	// role combines of rule
	var Role = function () {
		this.id = -1
		this._succ = []
		this._isTerminal = true
	}

	Role.create = function (id, isTerminal, succ) {
		var r = new Role
		r._id = id
		r._isTerminal = isTerminal
		r._succ = succ
		return r
	}


	Role.prototype.id = function () {
		return this._id
	}


	// undefined/null or role
	Role.prototype.succ = function (token) {
		return this._succ[token.type()]
	}


	Role.prototype.isTerminal = function () {
		return this._isTerminal
	}

	return Role
})