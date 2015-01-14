define(function (require, exports) {
	var Node = require('./node')

	var PartNode = function () {
		this._role = null
		this._rule = null
		this._token = null
	}

	PartNode.prototype = new Node


	PartNode.create = function (part) {
		this._rule = null // calc from part
		this._role = null // calc from rule
	}


	// 生成一条从当前节点指向leaf的路径, leaf没有被加入任何结构
	// 根据有效后继表来生成
	// 返回token组成的节点
	// 这里其实只需要用到part
	PartNode.prototype._completePath = function (token) {
		var current = this
		while (true) {
			var nextPart = current._role.part().succ(token)
			var child = PartNode.create(current._rule.part[0])
			current.appendChild(child)
			current = child
			if (nextPart.isTerminal()) {
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
	// 如果出现语法错误返回null, 否则返回
	PartNode.prototype.astAppendNextLeaf = function (token) {
		var topNode = this._role.processNextOnly(token)
		if (topNode) {
			this.appendBrother(topNode)
			topNode._completePath(token)
			return topNode
		} else if (this._role.isEnd()) {
			return this.parent()._role.astAppendNextLeaf(token)
		} else {
			return null // grammar error
		}
	}


	return PartNode
})