define(function () {

	var Node = function () {
		this._parent = null
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
	Node.prototype.addChild = function (child) {
		this.children().push(child)
		child._parent = this
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

	if (typeof QUnit != 'undefined') {
		QUnit.module('Node')

		QUnit.test('parent()/addChild()', function (assert) {
			var root = Node.create()
			var n1 = Node.create()
			var n2 = Node.create()
			var n3 = Node.create()
			root.addChild(n1)
			root.addChild(n2)
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
	}


	return Node
})