define(function () {

	// role combines of rule
	var Role = function () {
		this._id = -1
		this._part = null
		this._next = []
		this._isEnd = false
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
			var isEnd = true
			_.reduce(paras[2], function (memo, role, index) {
				if (!role) {
					return 0
				} else {
					isEnd = false // return
				}
			}, 0)
			roles[i].init(paras[0], paras[1], paras[2], isEnd)
		}
		return roles
	}

	Role.prototype.init = function (id, part, next, isEnd) {
		this._id = id
		this._part = part
		this._next = next
		this._isEnd = isEnd
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

	Role.prototype.isEnd = function () {
		return this._isEnd
	}


	if (typeof QUnit != 'undefined') {
		QUnit.module('Role')

		QUnit.test('createMany()/init()/id()/part()/next()/isEnd()', function (assert) {
			var roles = Role.createMany(3)
			Role.init(roles, [
				[1, 101, [11, 22, 33]],
				[2, 202, []],
				[3, 303, [null, 1, null]]
			])

			assert.equal(roles.length, 3)
			assert.equal(roles[0].id(), 1)
			assert.equal(roles[0].part(), 101)
			assert.equal(roles[0].next({
				type: function () {
					return 1
				}
			}), 22)
			assert.equal(roles[0].isEnd(), false)
			assert.equal(roles[1].isEnd(), true)
			assert.equal(roles[2].isEnd(), false)
		})
	}

	return Role
})