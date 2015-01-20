define(function (require) {
	var TreeNode = require('bower_components/tree/src/array-node')
	var json = require('src/rule/json-rule/json-rule')
	var rule = require('src/rule/rule')
	var Token = require('src/model/token')
	var PartNode = require('src/ast/part-node')
	var Role = require('src/rule/role')

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

	QUnit.test('{ "a" : "b" }', function (assert) {
		var rootRole = new Role.init(-1, rule.parts[11], [], true)
		var rootNode = PartNode.create(rootRole)
		var lastNode = PartNode.create(rule.object.roles[0]) // ^ match begin
		rootNode.addChildLast(lastNode)

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.BEGIN_OBJECT))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.STRING))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.NAME_SEPARATOR))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.STRING))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.END_OBJECT))

		// build a similar tree
		var tree = new TreeNode
		var member = new TreeNode
		var value = new TreeNode
		tree.addChildLast(new TreeNode, new TreeNode, member, new TreeNode)
		member.addChildLast(new TreeNode, new TreeNode, value)
		value.addChildLast(new TreeNode)
		assert.ok(rootNode.isSameStructure(tree))
	})


	QUnit.test('{ "a": 123 }', function (assert) {
		var root = PartNode.create(rule.value.roles[3]) // fake role
		var lastNode = PartNode.create(rule.object.roles[0]) // ^ match begin
		root.addChildLast(lastNode)

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.BEGIN_OBJECT))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.STRING))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.NAME_SEPARATOR))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.NUMBER))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.END_OBJECT))

		// build a similar tree
		var tree = new TreeNode
		var member = new TreeNode
		var value = new TreeNode
		tree.addChildLast(new TreeNode, new TreeNode, member, new TreeNode)
		member.addChildLast(new TreeNode, new TreeNode, value)
		value.addChildLast(new TreeNode)
		assert.ok(root.isSameStructure(tree))
	})


	QUnit.test('{ "n1": { "n4": 6 } }', function (assert) {
		var root = PartNode.create(rule.value.roles[3])
		var lastNode = PartNode.create(rule.object.roles[0])
		root.addChildLast(lastNode)
		assert.equal(lastNode._role, rule.object.roles[0])

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.BEGIN_OBJECT))
		assert.equal(lastNode._role, rule.object.roles[1])

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.STRING))
		assert.equal(lastNode._role, rule.member.roles[1])

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.NAME_SEPARATOR))
		assert.equal(lastNode._role, rule.member.roles[2])

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.BEGIN_OBJECT))
		assert.equal(lastNode._role, rule.object.roles[1])

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.STRING))
		assert.equal(lastNode._role, rule.member.roles[1])

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.NAME_SEPARATOR))
		assert.equal(lastNode._role, rule.member.roles[2])

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.NUMBER))
		assert.equal(lastNode._role, rule.value.roles[5])
		assert.equal(lastNode.parent()._role, rule.member.roles[3])

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.END_OBJECT))
		assert.equal(lastNode._role, rule.object.roles[5])

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.END_OBJECT))
		assert.equal(lastNode._role, rule.object.roles[5])

		// build a tree to compare
		// object1 -> ^ { member1 }
		// member1 -> "n1" : value1
		// value1  -> object2
		// object2 -> { member2 }
		// member2 -> "n4" : value2
		// value2  -> 6
		var value2 = new TreeNode().addChildLast(new TreeNode)
		var member2 = new TreeNode().addChildLast(new TreeNode, new TreeNode, value2)
		var object2 = new TreeNode().addChildLast(new TreeNode, member2, new TreeNode)
		var value1 = new TreeNode().addChildLast(object2)
		var member1 = new TreeNode().addChildLast(new TreeNode, new TreeNode, value1)
		var object1 = new TreeNode().addChildLast(new TreeNode, new TreeNode, member1, new TreeNode)

		assert.ok(root.isSameStructure(object1))
	})


	QUnit.test('[1, "1", { "a": 1 }]', function (assert) {
		var rootRole = new Role.init(-1, rule.parts[13], [], true)
		var rootNode = PartNode.create(rootRole)
		var lastNode = PartNode.create(rule.array.roles[0]) // ^ match begin
		rootNode.addChildLast(lastNode)

		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.BEGIN_ARRAY))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.NUMBER))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.COMMA))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.STRING))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.COMMA))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.BEGIN_OBJECT))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.STRING))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.NAME_SEPARATOR))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.NUMBER))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.END_OBJECT))
		lastNode = lastNode.astAppendNextLeaf(Token.create(Token.Type.END_ARRAY))


		// build a similar tree
		var tree = new TreeNode
		var value1 = new TreeNode().addChildLast(new TreeNode)
		var value2 = new TreeNode().addChildLast(new TreeNode)
		var object = new TreeNode()
		var value3 = new TreeNode().addChildLast(object)
		tree.addChildLast(new TreeNode, new TreeNode, value1, new TreeNode, value2, new TreeNode, value3, new TreeNode)

		var value4 = new TreeNode().addChildLast(new TreeNode)
		var member = new TreeNode().addChildLast(new TreeNode, new TreeNode, value4)
		object.addChildLast(new TreeNode, member, new TreeNode)

		assert.ok(rootNode.isSameStructure(tree))
	})
})