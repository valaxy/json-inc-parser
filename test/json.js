define(function (require) {
	var json = require('src/rule/json-rule/json-rule')
	var rule = require('src/rule/rule')

	var Token = require('src/model/token')
	var PartNode = require('src/ast/part-node')

	QUnit.module('PartNode')

	QUnit.test('_completePath()', function (assert) {
		json.bind()
		console.log(rule.value)
		var node = PartNode.create(rule.value.roles[1])
		var token = Token.create(Token.Type.BOOLEAN)
		var leaf = node._completePath(token)


		//// value -> object(current) -> {
		//var node = PartNode.create(rule.value.roles[3])
		//var token = Token.create(Token.Type.BEGIN_OBJECT)
		//var leaf = node._completePath(token)
		//console.log(leaf)
		assert.ok(true)
	})
})