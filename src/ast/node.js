define(function (require, exports) {
	var Node = function () {
		this._parent = null
		this._role = null
		this._children = []
	}

	Node.create = function () {
		return new Node()
	}


	Node.prototype._deepestLeftNode = function () {

	}


	/**
	 * 获取父亲节点
	 */
	Node.prototype.parent = function () {
		return this._parent
	}


	/**
	 * 获取儿子节点数组
	 */
	Node.prototype.children = function () {
		return this._children
	}


	/**
	 * 添加一个儿子节点到最后
	 */
	Node.prototype.appendChild = function (child) {
		this.children().push(child)
		child._parent = this
	}

	/**
	 * 添加一个儿子节点到指定位置
	 */
	Node.prototype.appendChildAt = function (i, child) {

	}


	/**
	 * 添加一个兄弟节点到直接相邻的后面
	 */
	Node.prototype.addBrotherAfter = function (brother) {
		var children = this._parent._children
		for (var i = 0; i < children.length; i++) {
			if (children[i] == this) {
				this._parent.appendChildAt(i + 1, brother)
			}
		}
	}

	// 从下往上试探节点
	// 不用从上往下试探因为一定可行
	// - 可以放在兄弟节点的后面, 那么就一定是这样放
	// - 不可以放在兄弟节点的后面, 那么
	//      - 如果是最终角色, 可能可以放在上级
	//      - 不是最终角色, 有问题
	Node.prototype.addNextLeaf = function (node) {
		var result = this._role.process(node)
		if (result) {
			return result._deepestLeftNode()
		} else if (this._role.isEnd()) {
			var result = this.parent()._role.process(node)
			return result._deepestLeftNode()
		} else {
			return null
		}
	}

	if (typeof QUnit != 'undefined') {
		QUnit.module('Node')

		QUnit.test('parent()/appendChild()', function (assert) {
			var root = Node.create()
			var n1 = Node.create()
			var n2 = Node.create()
			var n3 = Node.create()
			root.appendChild(n1)
			root.appendChild(n2)
			n2.appendChild(n3)

			assert.equal(n1.parent(), root)
			assert.equal(n2.parent(), root)
			assert.equal(n3.parent(), n2)
		})

		QUnit.test('children()', function (assert) {
			var root = Node.create()
			var n0 = Node.create()
			var n1 = Node.create()
			var n2 = Node.create()
			root.appendChild(n0)
			root.appendChild(n1)
			root.appendChild(n2)

			assert.equal(root.children()[0], n0)
			assert.equal(root.children()[1], n1)
			assert.equal(root.children()[2], n2)

		})
	}


	return Node
})