define(function (require, exports) {
	var Part = require('./part')

	var parts = exports.parts = [
		null,
		new Part,
		new Part,
		new Part,
		new Part,
		new Part,
		new Part,
		new Part,
		new Part,
		new Part,
		new Part,

		new Part,
		new Part,
		new Part,
		new Part
	]

	var initParas = [
		null,
		[1, true, []],
		[2, true, []],
		[3, true, []],
		[4, true, []],
		[5, true, []],
		[6, true, []],
		[7, true, []],
		[8, true, []],
		[9, true, []],
		[10, true, []],

		[11, false, [null, null, null, null, null, parts[5]]],
		[12, false, [null, null, null, null, parts[4]]],
		[13, false, [null, null, null, null, null, null, null, null, null, parts[9]]],
		[14, false, [null, parts[1], parts[2], parts[3], parts[4], parts[11], null, null, null, parts[13]]]
	]


	for (var i = 1; i < parts.length; i++) {
		var paras = initParas[i]
		parts[i].init(paras[0], paras[1], paras[2])
	}


	if (typeof QUnit != 'undefined') {
		QUnit.module('rule')

		QUnit.test('parts', function (assert) {
			assert.equal(parts.length, 14 + 1)
			assert.equal(parts[14].isTerminal(), false)
		})
	}
})