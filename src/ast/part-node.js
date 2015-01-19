define(function (require) {
	var TreeNode = require('bower_components/tree/src/linked-node')
	var LinkedListNode = require('bower_components/linked-list/src/linked-node')
	var Role = require('../rule/role')


	var PartNode = function () {
		TreeNode.call(this)
		LinkedListNode.call(this)
		this._role = null // null 时表示根节点
		this._state = PartNode.STATE_NOTSURE
		this._terminalLink = null
	}

	PartNode.STATE_RIGHT = 1
	PartNode.STATE_WRONG = 2
	PartNode.STATE_NOTSURE = 3


	// extend TreeNode function
	var prototype = new TreeNode
	delete prototype._parent
	delete prototype._childList
	delete prototype._linked
	PartNode.prototype = prototype


	PartNode.create = function (role) {
		var node = new PartNode
		node._role = role
		return node
	}

	PartNode.createNotSure = function () {
		return new PartNode
	}


	// 生成一条从当前节点指向token的路径, token没有被加入任何结构
	// 根据[有效后继角色表]来生成
	// 返回token形成的节点
	// 这里其实只需要用到part
	PartNode.prototype._completePath = function (token) {
		if (this._role.part().isTerminal()) {
			return this // 特殊情况
		}

		var current = this
		while (true) {
			var nextRole = current._role.part().succ(token)
			var child = PartNode.create(nextRole)
			current.addChildLast(child)
			current = child
			if (nextRole.part().isTerminal()) {
				break
			}
		}
		return current
	}


	// 从下往上试探节点
	// 不用从上往下试探因为一定可行
	// - 可以放在兄弟节点的后面, 那么就一定是这样放
	// - 不可以放在兄弟节点的后面, 那么
	//      - 如果是最终角色, 可能可以放在上级
	//      - 不是最终角色, 有问题
	// 语法分析树的操作
	//
	// 如果出现语法错误返回null, 否则返回token形成的节点
	PartNode.prototype.astAppendNextLeaf = function (token) {
		var brotherRole = this._role.next(token)
		if (brotherRole) {
			var brother = PartNode.create(brotherRole)
			this.appendRightBrother(brother)
			return brother._completePath(token)
		} else if (this._role.isEnd()) {
			return this.parent().astAppendNextLeaf(token)
		} else {
			return null // grammar error
		}
	}


	PartNode.prototype.state = function () {
		return this._state
	}

	PartNode.prototype.linkRightTo = function (linkedList, rightTerminal) {
		var rightLink = linkedList.insertAfter(this._terminalLink, new LinkedListNode)
		rightTerminal._terminalLink = rightLink
		rightLink._terminal = rightTerminal
	}


	// 节点加入链表, 成为第一个节点
	PartNode.prototype.addToList = function (list) {
		var link = list.addLast(new LinkedListNode)
		this._terminalLink = link
		link._terminal = this
	}

	PartNode.prototype.nextTerminal = function () {
		var nextLink = this._terminalLink.next()
		return nextLink ? nextLink._terminal : null
	}

	PartNode.prototype.prevTerminal = function () {
		var prevLink = this._terminalLink.prev()
		return prevLink ? prevLink._terminal : null
	}

	return PartNode
})