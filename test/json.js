define(function (require) {
	var json = require('src/rule/json-rule/json-rule')
	var rule = require('src/rule/rule')

	var Token = require('src/model/token')
	var PartNode = require('src/ast/part-node')

	json.bind()

	QUnit.module('PartNode')

	QUnit.test('_completePath():a case', function (assert) {
		// BOOLEAN
		var node = PartNode.create(rule.value.roles[1])
		var token = Token.create(Token.Type.BOOLEAN)
		var leaf = node._completePath(token)
		assert.equal(leaf._role, rule.value.roles[1])
	})

	QUnit.test('_completePath():a case', function (assert) {
		// value -> object(current) -> {
		var node = PartNode.create(rule.value.roles[3])
		var token = Token.create(Token.Type.BEGIN_OBJECT)
		var leaf = node._completePath(token)
		assert.equal(leaf._role, rule.object.roles[1])
	})

	QUnit.test('_completePath():a case', function (assert) {
		// value -> array(current) -> [
		var node = PartNode.create(rule.value.roles[4])
		var token = Token.create(Token.Type.BEGIN_ARRAY)
		var leaf = node._completePath(token)
		assert.equal(leaf._role, rule.array.roles[1])
	})

	QUnit.test('astAppendNextLeaf():a case', function (assert) {
		// member -> "n1" : value(n3)(+)
		// n3 -> "n4"(+)
		var root = PartNode.create(rule.object.roles[2])
		var n1 = PartNode.create(rule.member.roles[1])
		var n2 = PartNode.create(rule.member.roles[2])
		root.addChild(n1)
		root.addChild(n2)

		var n3 = n2.astAppendNextLeaf(Token.create(Token.Type.STRING))
		assert.equal(n3._role, rule.value.roles[6])
	})
})