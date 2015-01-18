define(function () {
	var Node = function () {
		this._parent = null
		this._children = []
	}

	Node.create = function () {
		return new Node()
	}


	//Node.prototype._deepestLeftNode = function () {
	//
	//}


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
	Node.prototype.addChild = function (child /** ... **/) {
		for (var i in arguments) {
			var child = arguments[i]
			this.children().push(child)
			child._parent = this
		}
		return this
	}

	/**
	 * 添加一个儿子节点到指定位置
	 */
	Node.prototype.addChildAt = function (i, child) {
		this.children().splice(i, 0, child)
		child._parent = this
	}


	/**
	 * 添加一个兄弟节点到直接相邻的后面
	 */
	Node.prototype.appendBrother = function (brother) {
		var brothers = this.parent().children()
		for (var i in brothers) {
			if (brothers[i] == this) {
				this.parent().addChildAt(i + 1, brother)
			}
		}
	}

	/**
	 * is same structure with another tree
	 * @param node
	 * @returns {boolean}
	 */
	Node.prototype.isSameStructure = function (node) {
		if (this.children().length != node.children().length) {
			return false
		}

		for (var i in this.children()) {
			var compare = this.children()[i].isSameStructure(node.children()[i])
			if (!compare) {
				return false
			}
		}

		return true
	}


	/**
	 * print a xml tree, a debug method
	 */
	Node.prototype.toString = function () {
		var queue = [{
			node: this,
			deep: 0
		}]
		var str = ''

		while (queue.length > 0) {
			var element = queue.shift()
			str += s.repeat(' ', element.deep * 4) + 'node' + '\n'
			for (var i in element.node.children()) {
				var child = element.node.children()[i]
				queue.push({
					node: child,
					deep: element.deep + 1
				})
			}
		}
		return str
	}


	if (typeof QUnit != 'undefined') {
		QUnit.module('Node')

		QUnit.test('parent()/addChild()', function (assert) {
			var root = Node.create()
			var n1 = Node.create()
			var n2 = Node.create()
			var n3 = Node.create()
			root.addChild(n1, n2)
			n2.addChild(n3)

			assert.equal(n1.parent(), root)
			assert.equal(n2.parent(), root)
			assert.equal(n3.parent(), n2)
		})

		QUnit.test('children()/addChildAt()', function (assert) {
			var root = Node.create()
			var n0 = Node.create()
			var n1 = Node.create()
			var n2 = Node.create()
			root.addChild(n1)
			root.addChildAt(1, n2)
			root.addChildAt(0, n0)

			assert.equal(root.children()[0], n0)
			assert.equal(root.children()[1], n1)
			assert.equal(root.children()[2], n2)
			assert.equal(n2.parent(), root)
		})

		QUnit.test('appendBrother()', function (assert) {
			var root = Node.create()
			var n0 = Node.create()
			var n1 = Node.create()
			var n2 = Node.create()
			root.addChild(n0)
			root.addChild(n2)
			n0.appendBrother(n1)

			assert.equal(root.children()[0], n0)
			assert.equal(root.children()[1], n1)
			assert.equal(root.children()[2], n2)
			assert.equal(n1.parent(), root)
		})

		QUnit.test('isSameStructure()', function (assert) {
			var root = Node.create()
			var n0 = Node.create()
			var n1 = Node.create()
			var n2 = Node.create()
			root.addChild(n0)
			root.addChild(n1)
			n1.addChild(n2)

			assert.ok(root.isSameStructure(root))
			assert.ok(!root.isSameStructure(n2))
		})
	}


	return Node
})