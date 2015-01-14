define(function () {

	// bnf part
	var Part = function () {
		this._id = -1
		this._succ = []
		this._isTerminal = true
	}

	Part.create = function (id, isTerminal, succ) {
		var part = new Part
		part._id = id
		part._isTerminal = isTerminal
		part._succ = succ
		return part
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
			var p = Part.create(0, false, [11, 22, 33])

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