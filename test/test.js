define(function (require, exports) {
	exports.init = function () {
		require('../src/ast/node')
		require('../src/parser/rule/part')
		require('../src/parser/rule/rule')
		require('../src/parser/rule/object')
		require('../src/editor/editor')
	}
})