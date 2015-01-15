define(function (require, exports) {
	exports.init = function () {
		require('src/ast/node')
		require('src/rule/part')
		//require('src/rule/rule')

		require('src/rule/json-rule/json-bind')

		require('src/editor/editor')

		require('./json')
	}
})