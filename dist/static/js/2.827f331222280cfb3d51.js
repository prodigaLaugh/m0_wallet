webpackJsonp([2],{"9bBU":function(t,e,n){n("mClu");var i=n("FeBl").Object;t.exports=function(t,e,n){return i.defineProperty(t,e,n)}},C4MV:function(t,e,n){t.exports={default:n("9bBU"),__esModule:!0}},FyAf:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUvSURBVGhDzZpPaBRXHMezs4t4SCAHCZtgwYKUUoQku5OQUGkq1IO0BynWP2iLnvRSqPTQQylWWu8pFLSHgqK3KATENqWBJhgQk01ipIQcCm1Ukg3NQcge9rBJ+v3O/Gab2Z2ZfW92Znc/MLz3fjP75n3nvfd7/zbRFhG9vb2dhmEM4TJ3d3ezMB1IJBIH7btl8rg2cf8Z7s0jPjM/P79p3amTuoQMDAykt7e3P0L0DK73UbiUdUMDiJpB8CCVSt2fnZ19ZVv1CSWEAnZ2dr5CIa6g8PvFXBfIq4S87iHfG4uLi3+JWRktISMjI6mtra3vEP0iKgGVUBCC28Vi8ery8nLBttZGWcjg4OBBNKMxRIdsS7xA0Ar62ye5XO5PMQWSlDAQ0zQ/gIjfUQtviSl28K4DCD5Lp9Mv8/n8c9vqT80ayWaz3+LrfI2MtTtyVOD9tzo6Oj6fnp5ms/MkUEgmkxmDgFOSbCoQMwMxxyGmKCYXhoRVsCZaRQRBWY4WCoWbkqzCs4+wT+AL/IQf+wptEn3d3d2r6+vrzyRdpqpp0TuVSqVFiGBnaznwgYvJZHJ4bm7OJcb1xTlO0MW2qgiCsu3HoDnGKZGYLFxCZLBryDhRJ4dRK67+Um5aMm/6m4rF1PJgwOx3mli5Rjh3agUR6AOv2A8kGQg+/DWJ2kJYG/jxFcvSPAr4kOcwVryJAnajPLfE7gueP4my9zFuuV9MA87C+DHjTYKTwxNYm/yyurq6s7GxUYSLfdTT08MOHdhnWXt49jenaXE90SwcEVyXuIDtKoJRO+UNhFiDdoJuDB7gX9RIM+ZSviL2glnGQwRcwHkCMcPo+MZQK4sgKN8PEvWDS2zDlIQSUM8195Qkw6IsguB9b0vUEwjNGniIGwVK4Nkf4VXeWFhYOEYfjjQ3E3TREkGPiuBLO+UNytHHzq46HRmFAK4JLB/PgQhf4pimGG0RcMV/IHrItvjSaaAwlVs2Xozi5fQgLmBb0RATSgTyD2xWhBpccy0vUMgpLxEOimJiE+HAPhLosXD/Z4n6UkNM7CIIm5bvOpjg/rsSDcRHTENEEDatWu37IgakoxIPpEJMw0TwfRQSuPeKjDkj/lVXDKINESG8TmIN/A4yeE8MfuzDdRqTuMeYoL2wTf7gmU2V50gEIsgU+wh3xVVox6VcMypEJII8ZdNSqn4hMjERimDzzxlox5w7NVRMlCJQ9s329vYZZ0B8IKEqocVEKUIY51aqJQQZj0NZ4HjigbaYGESwWd1haAlZWlr6B4Z7jGuiLCYOEfj4nD5Z3cJpWtxFuRGiVkhNMXGIIMjvukT/FyLHXbftlDa+YuISgY8+idooL/DKQgiPu/DAiiR1qRITo4h8KpW6JEmLqk1s0zSP4MEniLJg2rB5ouATfBnCszCFyscP5o/V6YlcLjcpJgvPg57+/v4LePiuJFuNb9Ckvpd4Gc/zEZ7ZYQ6WxhfV2phoABMQcVniLlx9ZC88s0M16oz4sYKyrJRKpXOSrMJXCEdLntkhGtaTRckEnMYwxrvXkq4i8DDUIZPJXERwE02tobv14jiue/WJSpSEELjSPp4UIXrYtsQLvR4czqeV3skPpT8MkLW1tXxXV9ddfKFDuI6IORYgYhLjxIeV54RBKNfIXlg7aLPXIOikmCIBAqakKWlvyYYS4oDxxkT1n0cBTqEAKht9VeC33DMYx+/vQEBoL1mXkL3AIfBAhjv7WRSOp0idleJg5+4KPQ//KPMU93NcFAX9NUONtrb/ACi9sj8EvSZcAAAAAElFTkSuQmCC"},LqQU:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("bOdI"),c=n.n(i),o=n("7+uW"),r=n("zL8q");o.default.use(r.Row),o.default.use(r.Col);var s={created:function(){},data:function(){return{}},methods:{verify:function(){var t,e=n("FyAf");r.MessageBox.alert('<div>\n\t\t\t\t\t<img src="'+e+'" alt="">\n\t\t\t\t\t<div>助记词顺序验证通过，请妥善保管助记词</div>\n\t\t\t\t</div>',"验证通过",(t={dangerouslyUseHTMLString:!0,closeOnClickModal:!0,showCancelButton:!0},c()(t,"showCancelButton",!1),c()(t,"showClose",!1),c()(t,"center",!0),t)).then(function(t){}).catch(function(t){})}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"outerWrap verifyMnemonicWrap"},[t._m(0),t._v(" "),t._m(1),t._v(" "),n("el-row",[n("el-col",{attrs:{lg:20,md:20}},[n("el-row",{staticClass:"recordMnemonicContentWrap"},[n("el-col",{staticClass:"title",attrs:{lg:24}},[t._v("⚠️请根据你记下的助记词，按顺序点击，验证你备份的助记词正确无误")]),t._v(" "),n("el-col",{staticClass:"recordMnemonicContent",attrs:{lg:24}},t._l(12,function(e){return n("span",[t._v("word")])}),0),t._v(" "),n("el-col",{staticClass:"recordMnemonicContent",staticStyle:{background:"none"},attrs:{lg:24}},t._l(12,function(e){return n("span",[t._v("word")])}),0),t._v(" "),n("el-col",{staticClass:"recordMnemonicNextStepBtn",attrs:{lg:24}},[n("div",{on:{click:t.verify}},[t._v("确认")])])],1)],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"commonTitle_one"},[this._v("\n\t\t账户管理\n\t\t"),e("span",[e("i",{staticClass:"el-icon-arrow-right"}),this._v(" "),e("span",[this._v("备份账户")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"commonTitle_two"},[this._v("\n\t\t备份Account1\n\t\t"),e("span",[this._v("返回")])])}]};var l=n("VU/8")(s,a,!1,function(t){n("xcjp")},"data-v-7d0e99bc",null);e.default=l.exports},bOdI:function(t,e,n){"use strict";e.__esModule=!0;var i,c=n("C4MV"),o=(i=c)&&i.__esModule?i:{default:i};e.default=function(t,e,n){return e in t?(0,o.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},mClu:function(t,e,n){var i=n("kM2E");i(i.S+i.F*!n("+E39"),"Object",{defineProperty:n("evD5").f})},xcjp:function(t,e){}});
//# sourceMappingURL=2.827f331222280cfb3d51.js.map