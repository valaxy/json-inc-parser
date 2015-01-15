define(function () {

	var Editor = function () {
		this._text = []
	}

	Editor.prototype = new EventEmitter()


	Editor.prototype.append = function (text) {
		this.insert(text, this._text.length)
		return this
	}


	Editor.prototype.insert = function (text, index) {
		index = index ? index : 0
		for (var i = 0; i < text.length; i++) {
			this._text.splice(index + i, 0, text[i])
		}
		return this.emitEvent('insert', [index, text])
	}


	Editor.prototype.remove = function (index, count) {
		var textAry = this._text.splice(index, count)
		return this.emitEvent('remove', [index, textAry.join('')])
	}


	Editor.prototype.length = function () {
		return this._text.length
	}


	Editor.prototype.toString = function () {
		return this._text.join('')
	}


	if (typeof QUnit != 'undefined') {
		QUnit.module('Editor')

		QUnit.test('length()', function (assert) {
			var editor = new Editor
			assert.equal(editor.length(), 0)

			editor.append('123')
			assert.equal(editor.length(), 3)
		})


		QUnit.test('insert()/toString()', function (assert) {
			var editor = new Editor
			assert.equal(editor.toString(), '')

			editor.insert('123')
			assert.equal(editor.toString(), '123')

			editor.insert('abc', 3)
			assert.equal(editor.toString(), '123abc')

			editor.insert('xyz', 2)
			assert.equal(editor.toString(), '12xyz3abc')
		})


		QUnit.test('append()', function (assert) {
			var editor = new Editor

			editor.append('123')
			assert.equal(editor.toString(), '123')

			editor.append('abc')
			assert.equal(editor.toString(), '123abc')
		})


		QUnit.test('remove()', function (assert) {
			var editor = new Editor

			editor.append('1234567890')
			editor.remove(0, 1)
			assert.equal(editor.toString(), '234567890')

			editor.remove(editor.length() - 1, 1)
			assert.equal(editor.toString(), '23456789')

			editor.remove(1, 5)
			assert.equal(editor.toString(), '289')
		})


		QUnit.test('event:insert', function (assert) {
			var editor = new Editor
			editor.once('insert', function (index, text) {
				assert.equal(index, 0)
				assert.equal(text, '123')
			}).append('123')

			editor.once('insert', function (index, text) {
				assert.equal(index, 1)
				assert.equal(text, 'abc')
			}).insert('abc', 1)
		})


		QUnit.test('event:remove', function (assert) {
			var editor = new Editor
			editor.append('1234567890').once('remove', function (index, text) {
				assert.equal(index, 0)
				assert.equal(text, '123')
			}).remove(0, 3)

			editor.once('remove', function (index, text) {
				assert.equal(index, 1)
				assert.equal(text, '567')
			}).remove(1, 3)
		})
	}
})


