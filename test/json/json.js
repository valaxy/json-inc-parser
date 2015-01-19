define(function (require) {
	var TreeNode = require('bower_components/tree/src/array-node')
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


	QUnit.test('astAppendNextLeaf():a small case', function (assert) {
		// member -> "n1" : value(n3)(+)
		// n3 -> "n4"(+)
		var root = PartNode.create(rule.object.roles[2])
		var n1 = PartNode.create(rule.member.roles[1])
		var n2 = PartNode.create(rule.member.roles[2])
		root.addChildLast(n1, n2)

		var n3 = n2.astAppendNextLeaf(Token.create(Token.Type.STRING))
		assert.equal(n3._role, rule.value.roles[6])
	})


	QUnit.test('{ "a": 123 }', function (assert) {
		var tokenTypes = [
			Token.Type.BEGIN_OBJECT,
			Token.Type.STRING,
			Token.Type.NAME_SEPARATOR,
			Token.Type.NUMBER,
			Token.Type.END_OBJECT
		]
		var root = PartNode.create(rule.value.roles[3]) // fake role
		var lastNode = PartNode.create(rule.object.roles[0]) // match ^
		root.addChildLast(lastNode)

		for (var i in tokenTypes) {
			var token = Token.create(tokenTypes[i])
			lastNode = lastNode.astAppendNextLeaf(token)
			console.log(lastNode)
		}

		// build a similar tree
		var tree = new TreeNode
		var member = new TreeNode
		tree.addChildLast(new TreeNode, new TreeNode, member, new TreeNode)
		member.addChildLast(new TreeNode, new TreeNode, new TreeNode)

		assert.ok(root.isSameStructure(tree))
	})

	QUnit.test('{ "n1": { "n4": 6 } }', function (assert) {
		var root = PartNode.create(rule.value.roles[3])
		var leaf = PartNode.create(rule.object.roles[0])
		root.addChildLast(leaf)
		assert.equal(leaf._role, rule.object.roles[0])

		leaf = leaf.astAppendNextLeaf(Token.create(Token.Type.BEGIN_OBJECT))
		assert.equal(leaf._role, rule.object.roles[1])

		leaf = leaf.astAppendNextLeaf(Token.create(Token.Type.STRING))
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
		// object1 -> ^ { member1 }
		// member1 -> "n1" : value1
		// value1  -> object2
		// object2 -> { member2 }
		// member2 -> "n4" : value2
		// value2  -> 6
		var value2 = TreeNode.create().addChildLast(TreeNode.create())
		var member2 = TreeNode.create().addChildLast(TreeNode.create(), TreeNode.create(), value2)
		var object2 = TreeNode.create().addChildLast(TreeNode.create(), member2, TreeNode.create())
		var value1 = TreeNode.create().addChildLast(object2)
		var member1 = TreeNode.create().addChildLast(TreeNode.create(), TreeNode.create(), value1)
		var object1 = TreeNode.create().addChildLast(TreeNode.create(), TreeNode.create(), member1, TreeNode.create())

		assert.ok(root.isSameStructure(object1))
	})
})