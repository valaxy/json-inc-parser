define(function (require, exports) {
	var Part = require('../part')
	var rule = require('../rule')

	exports.build = function () {
		rule.parts = Part.createMany(1 + 14)
	}

	exports.init = function () {
		Part.init(rule.parts, [
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

			[11, false, [null, null, null, null, null, rule.object.roles[1]]],
			[12, false, [null, null, null, null, rule.member.roles[1]]],
			[13, false, [null, null, null, null, null, null, null, null, null, rule.array.roles[1]]],
			[14, false, [null, rule.value.roles[1], rule.value.roles[2], rule.value.roles[5],
				rule.value.roles[6], rule.value.roles[3], null, null, null, rule.value.roles[4]]]
		])
	}
})