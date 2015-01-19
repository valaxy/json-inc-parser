define(function (require) {
	var json = require('src/rule/json-rule/json-rule')
	var rule = require('src/rule/rule')

	var Token = require('src/model/token')
	var Node = require('src/ast/node')
	var PartNode = require('src/ast/part-node')
	var Ast = require('src/ast/ast')

	json.bind()

	QUnit.module('Ast')

	QUnit.test('constructor', function (assert) {
		var ast = new Ast(rule.parts[11], rule.object.roles[0]) // part <object>, role o0

		assert.ok(1, 1)
	})

})