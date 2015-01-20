define(function (require) {
	var PartNode = require('./part-node')
	var Role = require('../rule/role')
	var LinkedList = require('bower_components/linked-list/src/linked-list')

	var Ast = function (rootPart, headRole) {
		this._rootNode = this._createRoot(rootPart)
		this._headNode = PartNode.create(headRole)
		this._rootNode.addChildLast(this._headNode)
		//this._terminalList = new LinkedList
		//this._headNode.addToList(this._terminalList)
	}

	Ast.prototype._createRoot = function (rootPart) {
		var rootRole = new Role
		rootRole.init(-1, rootPart, [], true) // unique role for the only root node
		var root = new PartNode(rootRole)
		return root
	}


	Ast.prototype._maintain = function (prev, node) {

	}


	Ast.prototype.beginTokenNode = function () {
		return this._headNode
	}

	Ast.prototype.rootNode = function () {
		return this._rootNode
	}


	Ast.prototype.appendNextToken = function (prevTokenNode, token) {
		var nextNode = prevTokenNode.astAppendNextLeaf(token)
		//prevTokenNode.linkRightTo(this._terminalList, nextNode)
		return nextNode

		//var notSureFlag = false
		//if (prevTokenNode.state() == PartNode.STATE_NOTSURE) {
		//	notSureFlag = true
		//} else { // right or wrong
		//	var nextNode = prevTokenNode.astAppendNextLeaf(token)
		//	if (nextNode) {
		//		nextNode._state = PartNode.STATE_RIGHT
		//	} else {
		//		notSureFlag = true
		//	}
		//}
		//
		//if (notSureFlag) {
		//	var nextNode = PartNode.createNotSure()
		//}
		//
		//prevTokenNode.linkRightTo(this._terminalList, nextNode)
		//return nextNode
	}


	Ast.prototype.removeTokenNode = function (node) {
		node.remove()
		var prev = node._prev
		// then 删除链表

		this._maintain(prev, node)
	}

	return Ast
})