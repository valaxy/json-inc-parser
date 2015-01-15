define(function () {

	// bnf part
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


	Part.prototype.id = function () {
		return this._id
	}


	// undefined/null or part
	Part.prototype.succ = function (token) {
		return this._succ[token.type()]
	}


	Part.prototype.isTerminal = function () {
		return this._isTerminal
	}


	if (typeof QUnit != 'undefined') {
		QUnit.module('part')

		QUnit.test('create()/id()/succ()/isTerminal()', function (assert) {
			var p = new Part
			p.init(0, false, [11, 22, 33])

			assert.equal(p.id(), 0)
			assert.deepEqual(p.isTerminal(), false)
			assert.equal(
				p.succ({
					type: function () {
						return 1
					}
				}),
				22
			)
		})
	}

	return Part
})