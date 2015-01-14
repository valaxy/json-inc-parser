define(function (require, exports) {
	exports.init = function () {
		require('../src/ast/node')
		require('../src/parser/part')
		require('../src/parser/rule')
		require('../src/parser/object')
	}
})