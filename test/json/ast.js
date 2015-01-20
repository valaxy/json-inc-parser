define(function (require) {
	var json = require('src/rule/json-rule/json-rule')
	var rule = require('src/rule/rule')
	var Token = require('src/model/token')
	var Ast = require('src/ast/ast')
	var TreeNode = require('bower_components/tree/src/array-node')
	var Role = require('src/rule/role')
	var PartNode = require('src/ast/part-node')

	json.bind()

	QUnit.module('Ast')

	//QUnit.test('constructor', function (assert) {
	//	var ast = new Ast(rule.parts[11], rule.object.roles[0]) // part <object>, role o0
	//
	//	assert.ok(1, 1)
	//})


	QUnit.test('{ "a" : "b" }', function (assert) {
		var tokenTypes = [
			Token.Type.BEGIN_OBJECT,
			Token.Type.STRING,
			Token.Type.NAME_SEPARATOR,
			Token.Type.STRING,
			Token.Type.END_OBJECT
		]
		var ast = new Ast(rule.parts[11], rule.object.roles[0]) // part <object>, role o0
		var lastNode = ast.beginTokenNode()

		var rootRole = new Role
		rootRole.init(-1, rule.parts[11], [], true)
		var rootNode = PartNode.create(rootRole)
		var lastNode = PartNode.create(rule.object.roles[0])
		rootNode.addChildLast(lastNode)

		for (var i in tokenTypes) {
			var token = Token.create(tokenTypes[i])
			lastNode = lastNode.astAppendNextLeaf(token)
			//console.log(ast.rootNode().toString())
		}




		var root = new TreeNode
		var member = new TreeNode
		root.addChildLast(new TreeNode, new TreeNode, member, new TreeNode)
		member.addChildLast(new TreeNode, new TreeNode, new TreeNode)
		assert.ok(rootNode.isSameStructure(root))
		//console.log(root.toString())
	})

})