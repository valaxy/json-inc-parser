define(function (require) {
	var json = require('src/rule/json-rule/json-rule')
	var rule = require('src/rule/rule')

	var Token = require('src/model/token')
	var PartNode = require('src/ast/part-node')
	var Ast = require('src/ast/ast')

	json.bind()

	QUnit.module('Ast')

	//QUnit.test('constructor', function (assert) {
	//	var ast = new Ast(rule.parts[11], rule.object.roles[0]) // part <object>, role o0
	//
	//	assert.ok(1, 1)
	//})


	//QUnit.test('appendNextToken', function (assert) {
	//	// { "a" : "b" }
	//	var tokenTypes = [
	//		Token.Type.BEGIN_OBJECT,
	//		Token.Type.STRING,
	//		Token.Type.NAME_SEPARATOR,
	//		Token.Type.STRING,
	//		Token.Type.END_OBJECT
	//	]
	//	var ast = new Ast(rule.parts[11], rule.object.roles[0]) // part <object>, role o0
	//	var lastToken = ast.beginTokenNode()
	//
	//	for (var i in tokenTypes) {
	//		var token = Token.create(tokenTypes[i])
	//		var tokenNode = ast.appendNextToken(lastToken, token)
	//		lastToken = tokenNode
	//	}
	//
	//	console.log(ast.rootNode().toString())
	//
	//	assert.ok(true)
	//})

})