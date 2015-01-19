define(function (require) {
	var PartNode = require('./part-node')
	var Role = require('../rule/role')

	var Ast = function (rootPart, headRole) {
		this._root = this._createRoot(rootPart)
		this._headNode = PartNode.create(headRole)
		this._root.addChildLast(this._headNode)
	}

	Ast.prototype._createRoot = function (rootPart) {
		var rootRole = new Role
		rootRole.init(-1, rootPart, [], true) // unique role for the only root node
		var root = new PartNode(rootRole)
		return root
	}

	Ast.prototype._maintain = function (prev, node) {

	}

	/**
	 *
	 * @param prev 可以为null, 表示添加第一个节点
	 * @param token
	 */
	Ast.prototype.appendTokenAfter = function (prev, token) {
		if (!prev) {
			if (this._beginPart.succ(token)) {
				var root = PartNode.createRoot
				root._completePath(token)
			}
		}


		var notSureFlag = false
		if (prev.state() == PartNode.STATE_NOTSURE) {
			notSureFlag = true
		} else { // right or wrong
			var nextNode = prev.astAppendNextLeaf(token)
			if (nextNode) {
				nextNode._state = PartNode.STATE_RIGHT
			} else {
				notSureFlag = true
			}
		}

		if (notSureFlag) {
			var orignalNext = prev.next()
			var nextNode = PartNode.createNotSure()
			prev.setNext(nextNode)
			nextNode.setNext(orignalNext)
		}
	}


	Ast.prototype.removeTokenNode = function (node) {
		node.remove()
		var prev = node._prev
		// then 删除链表

		this._maintain(prev, node)
	}

	return Ast
})