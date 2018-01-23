/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mortgage = __webpack_require__(1);

var mortgage = _interopRequireWildcard(_mortgage);

var _mortgage2 = __webpack_require__(2);

var _mortgage3 = _interopRequireDefault(_mortgage2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

document.getElementById('calcBtn').addEventListener('click', function () {
    var principal = document.getElementById("principal").value;
    var years = document.getElementById("years").value;
    var rate = document.getElementById("rate").value;
    //let monthlyPayment = calculateMonthlyPayment(principal, years, rate);
    //let {monthlyPayment, monthlyRate} = calculateMonthlyPayment(principal,years,rate);
    //let {monthlyPayment,monthlyRate,amortisation} = mortgage.calculationAmortisation(principal,years,rate);

    var _mortgage$calculateAm = mortgage.calculateAmortization(principal, years, rate),
        monthlyPayment = _mortgage$calculateAm.monthlyPayment,
        monthlyRate = _mortgage$calculateAm.monthlyRate,
        amortization = _mortgage$calculateAm.amortization;

    //let mortgage = new Mortgage();

    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
    var html = "";

    amortization.forEach(function (year, index) {
        return html += '\n        <tr>\n            <td>' + (index + 1) + '</td>\n            <td class="currency">' + Math.round(year.principal) + '</td>\n            <td class="stretch">\n            <div class="flex">\n                <div class="bar principal"\n                         style="flex:' + year.principalY + ';-webkit-flex:' + year.principalY + '">\n                    </div>\n                    <div class="bar interest"\n                         style="flex:' + year.interestY + ';-webkit-flex:' + year.interestY + '">\n                    </div>\n                </div>\n            </td>\n            <td class="currency left">' + Math.round(year.interestY) + '</td>\n            <td class="currency">' + Math.round(year.balance) + '</td>\n        </tr>\n    ';
    });
    document.getElementById("amortization").innerHTML = html;
    //amortization.forEach(month => console.log(month));
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var calculateMonthlyPayment = exports.calculateMonthlyPayment = function calculateMonthlyPayment(principal, years, rate) {
    var monthlyRate = 0;
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
    return { principal: principal, years: years, rate: rate, monthlyPayment: monthlyPayment, monthlyRate: monthlyRate };
};

var calculateAmortization = exports.calculateAmortization = function calculateAmortization(principal, years, rate) {
    var _calculateMonthlyPaym = calculateMonthlyPayment(principal, years, rate),
        monthlyRate = _calculateMonthlyPaym.monthlyRate,
        monthlyPayment = _calculateMonthlyPaym.monthlyPayment;

    var balance = principal;
    var amortization = [];
    for (var y = 0; y < years; y++) {
        var interestY = 0; //Interest payment for year y
        var principalY = 0; //Principal payment for year y
        for (var m = 0; m < 12; m++) {
            var interestM = balance * monthlyRate; //Interest payment for month m
            var principalM = monthlyPayment - interestM; //Principal payment for month m
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({ principalY: principalY, interestY: interestY, balance: balance });
    }
    return { monthlyPayment: monthlyPayment, monthlyRate: monthlyRate, amortization: amortization };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mortgage = function () {
    function Mortgage(principal, years, rate) {
        _classCallCheck(this, Mortgage);

        this.principle = principal;
        this.years = years;
        this.rate = rate;
    }

    _createClass(Mortgage, [{
        key: "monthlyPayment",
        get: function get() {
            var monthlyRate = this.rate / 100 / 12;
            return this.principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), this.years));
        }
    }, {
        key: "amortization",
        get: function get() {
            var monthlyPayment = this.monthlyPayment;
            var monthlyRate = this.rate / 100 / 12;
            var balance = this.principal;
            var amortization = [];
            for (var y = 0; y < this.years; y++) {
                var interestY = 0;
                var principalY = 0;
                for (var m = 0; m < 12; m++) {
                    var interestM = balance * monthlyRate;
                    var principalM = monthlyPayment - interestM;
                    interestY = interestY + interestM;
                    principalY = principalY + principalM;
                    balance = balance - principalM;
                }
                amortization.push({ principalY: principalY, interestY: interestY, balance: balance });
            }
            return amortization;
        }
    }]);

    return Mortgage;
}();

exports.default = Mortgage;

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map