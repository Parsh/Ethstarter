webpackHotUpdate(4,{

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ethereum_factory__ = __webpack_require__("./ethereum/factory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_components_importMDB__ = __webpack_require__("./ui-components/importMDB.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_components_mdb_stateless_components__ = __webpack_require__("./ui-components/mdb-stateless-components.js");

var _jsxFileName = "/home/parsh/Desktop/Ethereum and Solidity The Complete Developers Guide/Projects/Ethstarter/frontend/pages/index.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var CampaignShowcase =
/*#__PURE__*/
function (_Component) {
  _inherits(CampaignShowcase, _Component);

  function CampaignShowcase() {
    _classCallCheck(this, CampaignShowcase);

    return _possibleConstructorReturn(this, (CampaignShowcase.__proto__ || Object.getPrototypeOf(CampaignShowcase)).apply(this, arguments));
  }

  _createClass(CampaignShowcase, [{
    key: "renderCampaigns",
    value: function renderCampaigns() {
      var campaignCards = this.props.campaigns.map(function (address) {
        return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ui_components_mdb_stateless_components__["a" /* Card */], {
          title: address,
          key: address,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          }
        });
      });
      return campaignCards;
    }
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ui_components_mdb_stateless_components__["b" /* Jumbotron */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        className: "container mt-5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, Object(__WEBPACK_IMPORTED_MODULE_3__ui_components_importMDB__["a" /* default */])(), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, "Open Campaigns"), this.renderCampaigns(), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("button", {
        type: "button",
        "class": "btn btn-info",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, "Create CampaignShowcase")));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee() {
        var campaigns;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return __WEBPACK_IMPORTED_MODULE_2__ethereum_factory__["a" /* default */].methods.getDeployedCampaigns().call();

              case 2:
                campaigns = _context.sent;
                return _context.abrupt("return", {
                  campaigns: campaigns
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps() {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);

  return CampaignShowcase;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (CampaignShowcase);
    (function (Component, route) {
      if(!Component) return
      if (false) return
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ui-components/mdb-stateless-components.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Jumbotron; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "/home/parsh/Desktop/Ethereum and Solidity The Complete Developers Guide/Projects/Ethstarter/frontend/ui-components/mdb-stateless-components.js";

var Card = function Card(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "card hoverable",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "card-body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h4", {
    className: "card-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, props.title)), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
    className: "card-text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, props.children), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    href: "#",
    className: "btn btn-primary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, "View Campaign")));
};
var Jumbotron = function Jumbotron(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    "class": "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    "class": "col-md-12",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    "class": "card card-image",
    style: "background-image: url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg);",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    "class": "text-white text-center py-5 px-4 my-5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", {
    "class": "card-title pt-3 mb-5 font-bold",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("strong", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, "Create your beautiful website with MDBootstrap")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
    "class": "mx-5 mb-5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem, optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!."), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    "class": "btn btn-outline-white btn-rounded",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", {
    "class": "fa fa-clone left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    }
  }), " View project"))))));
};

/***/ })

})
//# sourceMappingURL=4.e2be038d29f592b5b68e.hot-update.js.map