define(function (require, exports) {
	exports.init = function () {
		require('src/rule/part')
		require('src/rule/role')
		require('src/editor/editor')

		require('src/rule/json-rule/json-rule')

		require('./json/json')
		require('./json/ast')
	}
})