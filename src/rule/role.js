define(function () {

	// role combines of rule
	var Role = function () {
		this._id = -1
		this._part = null
		this._next = []
	}

	Role.createMany = function (times) {
		var ary = []
		for (var i = 0; i < times; i++) {
			ary.push(new Role)
		}
		return ary
	}

	Role.init = function (roles, initParas) {
		for (var i = 0; i < roles.length; i++) {
			var paras = initParas[i]
			roles[i].init(paras[0], paras[1], paras[2])
		}
		return roles
	}

	Role.prototype.init = function (id, part, next) {
		this._id = id
		this._part = part
		this._next = next
	}


	Role.prototype.id = function () {
		return this._id
	}

	Role.prototype.part = function () {
		return this._part
	}

	// 有效有兄弟角色表
	Role.prototype.next = function (token) {
		return this._next[token.type()]
	}


	//// undefined/null or role
	//Role.prototype.succ = function (token) {
	//	return this._part.succ(token.type())
	//}


	//Role.prototype.isTerminal = function () {
	//	return this._part.isTerminal()
	//}

	return Role
})