define(function () {

	// role combines of rule
	var Role = function () {
		this._id = -1
		this._part = null
	}

	Role.create = function (id, part) {
		var role = new Role
		role._id = id
		role._part = part
		return role
	}


	Role.prototype.id = function () {
		return this._id
	}


	//// undefined/null or role
	//Role.prototype.succ = function (token) {
	//	return this._part.succ(token.type())
	//}
	//
	//
	//Role.prototype.isTerminal = function () {
	//	return this._part.isTerminal()
	//}

	return Role
})