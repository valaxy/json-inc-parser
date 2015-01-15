define(function (require, exports) {
	var Part = require('../part')
	var rule = require('../rule')

	exports.build = function () {
		rule.parts = Part.createMany(1 + 14)
		_.extend(rule.parts, {
			BOOLEAN: rule.parts[1],
			NULL: rule.parts[2],
			NUMBER: rule.parts[3],
			STRING: rule.parts[4],
			BEGIN_OBJECT: rule.parts[5],
			END_OBJECT: rule.parts[6],
			COMMA: rule.parts[7],
			NAME_SEPARATOR: rule.parts[8],
			BEGIN_ARRAY: rule.parts[9],
			END_ARRAY: rule.parts[10],

			object: rule.parts[11],
			member: rule.parts[12],
			array: rule.parts[13],
			value: rule.parts[14]
		})
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