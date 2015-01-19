define(function () {

	// bnf part: terminal or nonterminal
	var Part = function () {
		this._id = -1
		this._succ = []
		this._isTerminal = true
	}

	Part.createMany = function (times) {
		var ary = [null]
		for (var i = 1; i < times; i++) {
			ary.push(new Part)
		}
		return ary
	}

	Part.init = function (parts, initParas) {
		for (var i = 1; i < parts.length; i++) {
			var paras = initParas[i]
			parts[i].init(paras[0], paras[1], paras[2])
		}
	}

	Part.prototype.init = function (id, isTerminal, succ) {
		this._id = id
		this._isTerminal = isTerminal
		this._succ = succ
	}


	/**
	 * 唯一ID
	 */
	Part.prototype.id = function () {
		return this._id
	}


	/**
	 * 返回某词的有效后继角色
	 * @param token
	 * @returns {*} undefined/null or part
	 */
	Part.prototype.succ = function (token) {
		var path = this._succ[token.type()]
		if (Array.isArray(path)) {
			return path[0]
		} else { // single value
			return path
		}
	}

	/**
	 * 某词的有效后继路径终是否有指定角色(不包括自己)
	 * @param token
	 * @param role
	 */
	Part.prototype.succPathHas = function (token, role) {
		var path = this._succ[token.type()]
		if (!path) {
			return false
		}
		// multiply role value
		if (Array.isArray(path)) {
			return path.indexOf(role) >= 0
		}
		// single role value
		return path === role
	}


	/**
	 * 判断是否是终结符
	 */
	Part.prototype.isTerminal = function () {
		return this._isTerminal
	}


	if (typeof QUnit != 'undefined') {
		QUnit.module('Part')

		QUnit.test('id()/succ()/isTerminal()/succPathHas()', function (assert) {
			var p = new Part
			var tokenType = 1
			p.init(0, false, [11, 22, 33, [44, 55]])
			var token = {
				type: function () {
					return tokenType
				}
			}

			assert.equal(p.id(), 0)
			assert.deepEqual(p.isTerminal(), false)
			assert.equal(p.succ(token), 22)

			tokenType = 4
			assert.equal(p.succ(token), null)

			tokenType = 3
			assert.equal(p.succ(token), 44)
			assert.ok(p.succPathHas(token, 44))
			assert.ok(p.succPathHas(token, 55))
			assert.ok(!p.succPathHas(token, 33))
		})
	}

	return Part
})