define(function (require) {
	var json = require('src/rule/json-rule/json-rule')
	var rule = require('src/rule/rule')

	var Token = require('src/model/token')
	var Node = require('src/ast/node')
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


	QUnit.test('astAppendNextLeaf():a small case', function (assert) {
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

	QUnit.test('astAppendNextLeaf():a long object', function (assert) {
		// object -> { "n1": { "n4": 6 } }
		var root = PartNode.create(rule.value.roles[3])
		var n0 = PartNode.create(rule.object.roles[1])
		root.addChild(n0)

		var leaf = n0.astAppendNextLeaf(Token.create(Token.Type.STRING))
		assert.equal(leaf._role, rule.member.roles[1])

		leaf = leaf.astAppendNextLeaf(Token.create(Token.Type.NAME_SEPARATOR))
		assert.equal(leaf._role, rule.member.roles[2])

		leaf = leaf.astAppendNextLeaf(Token.create(Token.Type.BEGIN_OBJECT))
		assert.equal(leaf._role, rule.object.roles[1])

		leaf = leaf.astAppendNextLeaf(Token.create(Token.Type.STRING))
		assert.equal(leaf._role, rule.member.roles[1])

		leaf = leaf.astAppendNextLeaf(Token.create(Token.Type.NAME_SEPARATOR))
		assert.equal(leaf._role, rule.member.roles[2])

		leaf = leaf.astAppendNextLeaf(Token.create(Token.Type.NUMBER))
		assert.equal(leaf._role, rule.value.roles[5])
		assert.equal(leaf.parent()._role, rule.member.roles[3])

		leaf = leaf.astAppendNextLeaf(Token.create(Token.Type.END_OBJECT))
		assert.equal(leaf._role, rule.object.roles[5])

		leaf = leaf.astAppendNextLeaf(Token.create(Token.Type.END_OBJECT))
		assert.equal(leaf._role, rule.object.roles[5])

		// build a tree to compare
		// object1 -> { member1 }
		// member1 -> "n1" : value1
		// value1  -> object2
		// object2 -> { member2 }
		// member2 -> "n4" : value2
		// value2  -> 6
		var value2 = Node.create().addChild(Node.create())
		var member2 = Node.create().addChild(Node.create(), Node.create(), value2)
		var object2 = Node.create().addChild(Node.create(), member2, Node.create())
		var value1 = Node.create().addChild(object2)
		var member1 = Node.create().addChild(Node.create(), Node.create(), value1)
		var object1 = Node.create().addChild(Node.create(), member1, Node.create())

		assert.ok(root.isSameStructure(object1))
	})

})