"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  props: ['pages'],
  //用props帶入pages參數
  template: "\n\t<nav aria-label=\"Page navigation example\">\n\t\t<ul class=\"pagination\">\n\t\t\t<!--\u5207\u63DBclass,\u7576\u6709\u8DB3\u5920\u524D\u4E00\u9801\u7684\u8CC7\u6599\u6642\u624D\u6703\u986F\u793A\u53EF\u4EE5\u9EDE\u64CA-->\n\t\t\t<li class=\"page-item\" :class=\"{ disabled: !pages.has_pre }\">\n\t\t\t\t<a class=\"page-link\" href=\"#\" aria-label=\"Previous\" @click=\"$emit('get-product', pages.current_page - 1)\">\n\t\t\t\t\t<span aria-hidden=\"true\">&laquo;</span>\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t\t<!--\u8907\u88FD\u9801\u78BC\u529F\u80FD--><!--\u5207\u63DBclass,\u9EDE\u64CA\u7576\u524D\u662F\u9801\u9762\u7684\u6642\u5019\u6703\u589E\u52A0\u6548\u679C-->\n\t\t\t<li class=\"page-item\" \n\t\t\tv-for=\"page in pages.total_pages\" :key=\"page + 'number'\" \n\t\t\t:class=\"{ active: page === pages.current_page}\">\n\t\t\t\t<a class=\"page-link\" href=\"#\" \n\t\t\t\t@click=\"$emit('get-product',page)\"\n\t\t\t\t>{{page}}</a>\n\t\t\t</li>\n\t\t\t<!--\u5207\u63DBclass,\u7576\u6709\u8DB3\u5920\u4E0B\u4E00\u9801\u7684\u8CC7\u6599\u6642\u624D\u6703\u986F\u793A\u53EF\u4EE5\u9EDE\u64CA-->\n\t\t\t<li class=\"page-item\" :class=\"{ disabled: !pages.has_next }\">\n\t\t\t\t<a class=\"page-link\" href=\"#\" aria-label=\"Next\" @click=\"$emit('get-product',pages.current_page + 1)\">\n\t\t\t\t\t<span aria-hidden=\"true\">&raquo;</span>\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t</ul>\n\t</nav>"
};
exports["default"] = _default;