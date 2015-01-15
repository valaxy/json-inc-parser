define(function (require) {
	var Node = require('./node')

	var PartNode = function () {
		this._role = null
	}

	PartNode.prototype = new Node


	PartNode.create = function (role) {
		var node = new PartNode
		node._role = role
		return node
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
			current.addChild(child)
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
			this.appendBrother(brother)
			return brother._completePath(token)
		} else if (this._role.isEnd()) {
			return this.parent().astAppendNextLeaf(token)
		} else {
			return null // grammar error
		}
	}


	return PartNode
})