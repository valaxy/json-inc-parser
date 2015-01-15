define(function (require, exports) {
	exports.init = function () {
		require('src/ast/node')
		require('src/rule/part')
		require('src/rule/rule')

		require('src/rule/object')
		require('src/rule/member')
		require('src/rule/array')
		require('src/rule/value')

		require('src/editor/editor')
	}
})