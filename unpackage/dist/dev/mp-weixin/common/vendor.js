(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"MaWeiTravel","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!***********************************************!*\
  !*** E:/3.0/MaWeiTravel/pages/store/store.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);

// 数据仓库

// 首页tab切换传输存储的值
var list = {
  listing: [] };



// tab切换的状态
var load = {
  loading: '' };


var navmin = {
  loading: '' };


// tab切换没有数据的提示
var nonemin = {
  nonedata: '' };


// 选择页面跳转到攻略页面
var city = {
  citying: '' };


// 选择页面跳转到发表页面
var travecity = {
  traveing: '' };


//用户发表景点成功，传值给攻略页面让攻略页面再次请求数据
var roturn = {
  pagesid: false };


// 数据仓库
var state = {
  list: list,
  load: load,
  navmin: navmin,
  nonemin: nonemin,
  city: city, //获取citying数据
  travecity: travecity,
  roturn: roturn };var _default =


new _vuex.default.Store({
  state: state,
  //处理异步操作
  actions: {
    listact: function listact(_listact, listadata) {
      console.log(listadata);
      _listact.commit('listmut');
    } },


  // 同步操作
  mutations: {
    listmuta: function listmuta(state, listdata) {
      // console.log(listdata)
      state.list = {
        listing: listdata };

    } },


  //以对象形式传过来的参数
  navmuta: function navmuta(state, pullobj) {
    console.log(pullobj);
    state.navmin = {
      loading: pullobj.loading,
      naving: pullobj.nav,
      pageid: pullobj.pageid,
      uniload: pullobj.uniload,
      nonedata: pullobj.nonedata };

  },


  // 选择页面跳转到攻略页面的
  citymuta: function citymuta(state, cityion) {
    console.log(cityion);
    state.city = {
      citying: cityion };

  },

  // // 选择页面跳转到攻略页面
  travemuta: function travemuta(state, cityion) {
    console.log(cityion);
    state.travecity = {
      traveing: cityion };

  },

  // 用户发表景点成功，传值给攻略页面让攻略页面再次请求数据
  roturnmuta: function roturnmuta(state, pagesid) {
    state.roturn = {
      pagesid: pagesid };

  }
  // }
});exports.default = _default;

/***/ }),

/***/ 12:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 149:
/*!**********************************************!*\
  !*** E:/3.0/MaWeiTravel/static/tab/轮播图1.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 150:
/*!**********************************************!*\
  !*** E:/3.0/MaWeiTravel/static/tab/轮播图2.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEsAhUDASIAAhEBAxEB/8QAHAAAAgMBAQEBAAAAAAAAAAAAAwQCBQYBAAcI/8QAUBAAAgEDAgMFBQUFBQYCBgsAAQIDAAQREiEFMUETIlFhcQYygZGhFCNCscEVUtHh8AckM2JyFkOCkqLSsvElNYSUwuI0RVNUZHN0g5Ok0//EABsBAAIDAQEBAAAAAAAAAAAAAAIDAAEEBQYH/8QANREAAgIBBAEDAwIEBQQDAAAAAAECEQMEEiExQRMiUQVhcRQyI0KBsTORocHRBhUkUjRD8P/aAAwDAQACEQMRAD8AAIuOW5e6sbjgtlbs3SLn6ktz+GaDPx37QoguvalLck4b7JcI/wAsLqFVKW0Fqon4Xw27uGJ3/vK6G/1bE/MUxEtzHA0k3A7K2k3JeRS6fHcEVPST7/2CsJcvw2wjIl4lxbiAkIJWSN5g3h75H0NKwLwS41vHweft890T4i1envD61JJuIWRS6fiXB7a2G6RQxhkYHyGTQJeIJfy6U9pbtA2SYrcvp9Nwoo1B+CrQXRxeZQkfs7AIFIIZ5H2H5Ch3dtfsVFsvDIAT+NU1Ltnnq3+VLyS20Q+yaOK343zkadPxJJ+FQHDrO2VZbXgbs2BkySlHB+C/lToxKbOJeS2mv7dx211PjvQ4Mi42GOzXl5UjLClxD9om4zfXKBiygB3xjl77DBqxWeOaVmurbhqOdl7WYal9csM0uz3Op5I77h0MPujRApBHXcIfzpqj8g2AW54dxN4re4tbx3B3uMKGPqoz89z61J7S5trxYrLgTK4GtJTM5JHiMYFebi4uNMA4tcxNyJRWCY8txUYrqOxZ4TFxC47Q5dSQUc9OZz8ajjXNkTQ2olEEs13Z2FvcE5EsgVhn01bH4YpctfwjXd8Zt7dW2KLGpyPDCITiovwuNLFrq34TJ2hOSJG0lfgFw3zrkckxt0+1xWP2RDglZRlSf+IkHyxU9vknPgNcNDxWRIm4tcyoF7yDtCPRVcrn0odseGWcjQWllxC6ycOh0Rg48gGNBkDmNpbW/h7CM7PFHpcfHSG+tG+2W99ZJaz3l07hu7IYmBH+o539edHt+AbGBYiKBHtuDiZ2bdJ3dGTyIGAR51OOeeOUWvEoeEWsIyRG7LGyk7ZBLHJ8qWNsLS8Rbe0vrmcDUC0oAI8iASRR3sEk13Q4VBb3bHCwTsdDeGndTnyqpJ+AkFE1ysh18dhjts4jkjtwQ4zyDRxkg+po3F7u2nuZuF3F5dRKJO6Vz2a7cj3t/XFKRyz2tysM7cKtlyNcKgur+GSNeKs+IzzxcRvZIeOXFpCrd5bZCcHA2YDHzrO1/GVfA3/63fyZ8cOS3nMdvw2/lnjw4liIx6gBSceeacFsbyKSU8NRboEDS0mnX6AY38sVOO7SeIxXB4pJqIC3I20gnfrkjyqEnDDDrJ4LLKynK3n2kgeRPdx/1Vpv4E0KxXk9tMyFOGQuBhlaMKxHgcnem5My2kk1rxJIrZcaozDlkbwDBCceBzvRBAbuyfUnDvtjHAcTBi48gr+96jekI3PDvvBxO1lJ2aFVOWHVTlB+dX7aonKCWl7B2TwXF3fzq66WR11afNSXz9KHPw61ssRmyuSxwVkLqsbA8jjTn60xdYnsRPHc3kls52t+eg9QTnFStvsUkS2EkF20btkds4GhvEYycHrtVfYhJk7SBLa7s4YJQum2cyk5OdlO/wAulKSTvZlEJsFcHZ4Y9TqfPBP5UZrBYbgxpw60t3HS5u1wfMZKU5MGukEomsIbmLvTdwSKRyB5MD5/OgvguhW5uTcWpliudUa47dY4FBDH8Q1AHHx50KGeUSgQPe3UXJ0cnl6AtRYL9be7Vnvs/vLawYUj4ad/Dau3tzIJ0S4vOJXMbDKupxgH1O9C8iXJe2wE/DUt5AsdnOSdwzYAIPI8qdisbiW1e3e0jRkBeEtL1PMc/Df4V6OJJrUW5sbxymWiEradeeY2B9a4lr2EitBw6G3nU5AmuBt6A6c1XqpeeC9jaK9YnjTe64e3TKupb5A1YMe0gS4XiCRhhob7knLDmR3D5Gp3lrN2w0WtrAjEYYhiQeudyOflTdpaXKwywzTQ5cBk0QglSOoGkcxt8qFZ49WF6b7KiwlS34kp7eciTKM6krgHbI3GMc+XSpz8PtXnf+6cRuZQSGdtIORz6NT6W7quqPiN4wYZ0rEwH54o1xY/aOynEd88jJ+AjAI233zk86tTUkTbRWtZJLw4otjMrwvssrgEBvHYdRROG2xt+IW6XFvEkbHLMTkfKrDh/Bbgu4ntxokRhollIY4wQcEcvMZqvubCOG5D24hWLk33qMSeuMHP0pWdxywlBPwHBOFSoFxizt47ktABCyjDxO+532KnG/50Dhk7RrclbloiIye7HqIAIORtj6125tmQ5bCgMVB6HFH4dAsVzGFmnBfO6x43II5+tJ0GOS75RM7vmqFmuo3c/wDpLijEjou2fDAk/Su3MMM8cDy2d7cDs/8AE1hRzI3yp3+NGkQXLFZl4rPtjLFd/ga5NEkdrbo9s4QBl++ueyHPlyweddJL2szvsUs7ZFvFMVuVXSww8gJPdO3dxil5xCe6IbWBx0E5b4bmrCG1SO7jkSG2jXvbfaFlzseeMGlpGhki+7fh6ED/AHKyZP8AzZo6tIG+ySutvZQLJLbd4s2toWkxuOWnOKjGV+0x6b9ZhqyVWArjHqo/OmFGLKGNpmXulsizEh5n8XT0oFhHKbtgpuZMISNPvE46A9aJL3lX7T3aST/eRXXF9fPCQ6R/0vj6Vwqs8CJdR3U7MxIzMAR031A560C6iaCXOi4jYnczvpJ+VHu4FWKLXHASiAFpJg3n7o3FUo1FsjdtAF4c1vdIzWohiB1Zdwdhv0r0wSUNNEOHpncgXGs/ImiQdl2EsgW0jJGgMquAc9Dz6VCF3YhA4Oo4ANopH/MRV7XwiJ9s6pjS2WOSa2idu+dULMPLGAQKhbO7SlDcdtCneIWEb+mQDRGMrXZNu14eg7HCnAr1y7NDpmeZ3ff79wpwOhNFXub+Cr4ohMk8R7aGXiQY7k9mYh9DRngluoAksV1dOBkv269eh1ZNDXRHFqdCoXcFb3WPTSKBEIZNTsOHyO5z94r6s/Cq2tR+7Jdv8HIIUt5NbwRxMh7uuQgMfAn+FDkQSXGIhbAk7hX15+JqcrKrdnGNCr0WPIz1513vLFqwWL7DChSBR7PnpAbgcssbDs0dVReQ7MnfrXUYwQZyztJ7pCjK+deRMHUxlCrz1MPlQWJmlJ0rk8gHqJfzeWS/B5Yy75Z5wBuSdq7Jmdt4ycjZddckZNAiQgqOYOTvXcLEowAJG3UqvIVNnjwSzj9lChij0DPvAt18KDPLHaw9o6oWYfdgePifKiopALsTgdCo71QKRzya3hU+ZI2FDJPx34LTKCSRpZGd2JZjkmuZJTSCdOcgdKvwYxIVjiiIJwKlJIi6dMcescwRkVjemk+bG70UKtIE0ANgnI9atba0SziEsuDOwyqk8qY7TSNRjTLcgqcqHliTJIx+KjJp2LDsd+f7ASlZwkSN2kgTT1OahkyHQmAvQYrrEyHJyqDwOwqBOsdmhGkdSedMr/8AfJR4sq7aAxHM4r1QLRrsBqPWvVVslG5g+zTzG5jv+KTTYOykKceGkkZqMVvDdTs9z7PXBjHKY93J8WAH5GoNdtcOcz8RRTzC5RSfmcV6TtJIzotXnhGNck0w29GH60p4WHuGR9oSN1tLThiwA4ZjKxAPmur9K9LxASRCKO94dbSg4JghU/pmlHaJZU/Z32KFgTlXbWfTY1J7kQZDzQdsSTmG33+TLj61PTTI5B5LlrX7u44le3gfpHEVPwOVxUDZRzf3r7NxK6Zd9MspBT0OGqMZks17eC4vZ9ezKqaF/h9KC1nBJruJLSWGQnOJpe6f+Idav06JuDDRIxluOGQ6FHOWcFh64K5+VBknkMcklq3DIrb3SEiDN9d6lLoCJJeWtkIx+/OZG+m/wqBLO7SWl5DHHjHZwwksR6MPPxqbeei9wFr8TIgiv2RjsyLbaR8yv60N2nVXSAcSuHYd8AED5qT+VM9or9mY57yBz7zxxdiPoa5Os8QLdncyxt70lxMNJOOYYVNjJZUNZPCUnityHyMiRwGLfQ1Y2aCVJzctaxkxZZ2IJxkYLL13I350vMlpDNHJFErjRqI7bWQ2fEUM3waznSKFUOpXYjvAkZ559eVYck6ltNEEqsKIpYR2zX8EUZJCvBCSsg8Nh9DTem24myIss0cqr/u00q58txiqX9ov2iK4XTyZQAFPqBitRcSLdcMeO2eeVH/FK/vj91M8l8uZ+lbMMr4QiS8lf2k1uHjuba5mt22PbuRvyzkg4+dFFtBCiS2tpbyw4yzySkMh89JAFeGloBHeRoEQ4H32XXbwO5FcSJrWPt4JLbSxKrpRiW8j0+BrTt+RdjttdxOxa4PDHd8BXx2uB4EHf486Jxu6nsOKuqX0zRuql4xGG5gcyQAR5ZpeI9uQsY7Ig5KGBe8fFSd/hVhxti17LDPBO8Dxx94MML3Rk/yrn5E/1Ufw/wDY1xr0H+UKuJJY2lhPFfs/4rYytED4lfeXHljahiBbZEE1if2cxziW5V2U+I04I9Mb1D7MLe3MsMUZSNu5Ot0Rn/h8fKi27Wt3CVhisPtrnJzG4J9OQB8t627fJnvwCuI/szrd268Mjhf3FAMxI8QGyaN2guD21teqt62S6RW+ntB5BhjPlRLZ5YINN007pkjsms0wD4hvGnP2dcQcNyLriJjIzgXAEa+GQdxQPaixG3MyZu4k4nKCNMqtB2aEf6kJA9cVybg4u0M9ta3N0QM9q86vjyIxnPlmrrh1nbXsYivjAty+0RjulIk9VBzmnrXhtxwTMiRw3EWrMkK20iuwHPDbjNInl2vb58FpWZu1snvIktZVtvtY7kGolSf8pz9M+laHhfsfx55zH9ht7d49tb24Ab4jnW0g4Pa3fDTLbyymOb3UlCAjy7y7Yq74De3MA+x8ShaC4RcRzSyq4mXzK7avLwrnZtdkpuK5QyMEYy1/s/vLhFa64mttG7EGJ4xrQ+GMAnyIqh4la8A4Hez2d7fXF12ZOYoA2osMbNqwAPPJ9K3/ALV2nF0sjxD2fmtor09yQ24GopuSRq5HOOW9fC7ozvcyNO7PMWJdmOSW6knrScCy6q3dBtqHZsOGcT4JLxyygtLOSO3mcLNJMArIDzxpO/rt6Cvqll7Lez17YJJw5w0AJVZYAHLdDnIO+fCvgHD5Db3cUwAJRgcV95/s2ugPZVAoTs/tEhJMoB555Y/WplwSxNX0XuUlwfLfbLjUNzfLZ8NsWtEtJJY3kZgWm3A3AGFxpPU8/KtP/Z1NwjirJw67szHdKMQOsjtrwCSTnlyPl0rO33s5xXiPtBfiGydSbiRgZSEUgsTsTgGtN7E+zXF+Ce0cV1eWrwxrG3fQCbJIwNkJ8etG8cFjT3che4v5fYaL9qrCkjxxmTXntipcY6AeFQ9o/Y6G2sFnhWGZ4mDH7QndUdWJ8hWyuZ3RUuUSSR4/e/uxDFTzC5xvyrjTiVXWZZ0DggxzSRAfLJoN0k+yt3RjrT2UtLrh8V1FN2rA5V7VWZR5ANRuJ+ynC+Ih5jbRwXLDeVIwd/Mcqfs+KtDrtuIzKDG5RZJr1YdeP3EQe7604k0LRsUmjZMnBR9QHXGaz5d8XuTNGKVumj5hxjgF9ZRFmmLQIwCvbwq2dj0J+ecH1qosuASzTrMSg0sCDNdIreuhSdq+xfZY1gaJRgNvt51UzcCiVu04cIrWQnLGKJAX+JBxTMGucI7GHPDGb3Hxu4s4mv5IibfKMQWvLgknfmCK5f2qQ29uD2CrrYCRY2deh686017I0XH7qK51QKZCynXBE2fxAyMo9diPSoe0Cm0soJrS5ygk72niDSsQRyLAYHwrtwy7mvuc+WOrM5b27ZXs1WVdLHXFZlOniQM0se1WEKZb0NjdZYY1HzzWktbGG4hklSFQ4Qtq0zytyPVlUD13ql4fatcAgW4cocFvsxf6l/zFPjLj8CnEVnzBBGxFwh0DBju9AByeYA39aVhCmOeSXspQVAw8hOd+p51YXyG24rp7qhVVe+sY5DzyKhdjTZKVmOWfIKyptgdNG3WnruxTXBVrFHNKujRHk40BGP1NHuI5ZJWfspVQMcSRW/P1Jxmm4zI6CWZ3fSpb7x5CPqMfWkYYgwKqnc5ci2PqKJLiirpkykrW6ImttRLPlkQ+VQjKqjlGljCjH3lzqXJ26DagXc0AuSpaFdPdGdI2HrXLi8hihRe1TUw1dzG/h7oouLbBt1Rzs4y4RoraWRjjWsrH9anJjWXjEcqgYCm2LYA8yKEL0C2Mnauw90L3zv6EUKCQsSTBKExnJjO+PDerpdWRyd2MMVChTlHI1ERIqg+AOTUe2k06pmJPJcsB+QpMzTSSFjbOMnmdI/Ooz3Ewk0pGoQbDLgZ+VTi7K56GEXLe8Co3OHJqDgyuWON9hlCdqXluZ+xCqUXqxLE0ol+6qwLAO2wZU5fWhnlhDiRajJ8osXYBeyXGBzwBuajrMa4zhz44BWqtbqRZATIWAPLSBmoPcyM2rtZM+RApL1cOwliZaqdA7Rif8o1c64uZHZiM43bY1WS3UrvnLDpgMQKEZHKBPwg5wT1oHqorhItYnRbPlzjGFHLI5Cos6kBEI356SO9VV2jBWUEANscda7qKpqXAIPMDlQPVr4C9Jli1xFESnaLq65PKotNHDgs2XO43JqtDsOR+VRLsebHPrQfq38F+kWJniK9q5LZPLBzmoLOJCSwIAGR3fyqvJPjUu8FG+DQ/qn8F+mNNda2ChCqZ5ZqD3W2lF28SdzS2onng15tht15Ut6ibC2IZ+0BQNIBJG+TXqRbnvXqnrzK2I+jJbyJEYu3lnTOyzOdh6jnUVtnhjLQ20St1wSx/Pen1Qjka6NyTXXpeDLbKY3yIqxSQuJGOnItNJPzphZniHZQzSzMdzHIyrt88irINoBJ3A8aT+y2czEPBHjOQQuD86FRZe5C7MijDM0cxOdLzllB+Fefs1dTPFCXI2eJC1HksY5MIkkiA/utv8+dCteGmAsVurgg7aZHLCrr7Esl96EUjLxg+6kAX6Goy6Lj35JVQbhGlVfqN6g1nKwJgkt1kU5y6E5+GedS+z3x2W3jnkO2AQpz5ZBqnS7LVvo7K4mRFuEAiHLtJix+gwaHoJU/Zuxih6hY2bPqDmiaLpQrCKbtOqHBx8FqLygpmaK5SQHul1kIH8Kq4fJfu+BWbXDKZRaB8LumnSB4HH8arZr26uVeNYY4kPvKq4q8jzI57WES7f4gjH8RXvu45D2bRS6feXujT+ZFZ3pIOe5sassttGZNvO4JWCRgo7zBDgVd8FtllhA1iOXUca4SwI2wBT6BZgJ7a6y5buqswA+nOmDoutX2gHt1GA33jDPmMU2GFQdoCU74IMzMrC8ikUnZZljVMY9cZogEtt98Wa6twAMmRQPjzosFtLpVZ4O3hUZUpHnbyOfpUY42SUmKRmXm6EoukeBGDRKUZcJl04q2gccMV00bQOO0ySYpJWbH+nlVrx+GGS+jWWM62t49LrGWwcdfGkFRZbnWh7OXOQqvleXQryq09oOwW5tVuY1ObdMPgkg8uvMfWsGZ/+Zj/ABL/AGNMP/jy/KKrs7ixOCitFtnCKEceecU0yreRBlDORkmAzAFR4ggHIqOn7PCSFR4ickLENDfHVsfhmuRGKQ9paS4Ze8U1orJ/08q2tGWxqC6hmRIL/sJYwCIi7s+n/UBjPrR4rW74dc/aLCLKHGq2S3Yo49cn50O3n+0Nol1wy8tepwj/AC2B/OpRSyWdx2E0ImiO2GUak8xqOfhSJRCTLQxw8Wia4hee3lXYxB44Qh88/nTnDOICaQcO4uIftSj7qcTkhh4EqOf51RXE8XD7lL21u4Igx0BneONH8VI3+Rpq+4rY8TsNQu4maIapUW4aTGeoES5IrJkxp8eP7DY2X8cl1wW7aYR/bLaQ/eILeeQkdMFyRkVe3Fss8C31p2sgHeSUWcCBD5M+CCPWshZ8bgv7MW13ItzIdo5XhuGBwORDlVz5nwrvCb/7LE4Tht40JyDF+y4xv1ZcyNg/Cs0sDb+/9xqdG5suOLxCKQyXEi3UI+8X9oJGhA5N3WI3rAXPsdZ8R4rNNPxyJWnnLNoDyBQT1bAz61bQ3HEU4gXt7G9CxsDFKJrdAfh2WR6ZpyR+OXVzFMlvoDDMiz8SmBU56BCFIqYYSwy3wXZJJSVNiEX9nnCYJQjNxKcj8Uds5VviQPpWttLSDgfDESxt7qK3zqYNFEmGI3y0pOPSqm44VxPiMHZSfYEeMjQ0qSXGV8O821ORcBujbmJri1jBGC8FkilT4gMCOlXmllyKpEhCMXaLZeLie2Om62UZwt/AgA8SU/Sg2nFkvA0ImDEjkl3PIT/xBMfI1yy4Fc28ao3FrqUA57yIuP8AlUUzH7O28WSl5xEk+92t7I4PwyKz+m0NpCy3LC57OO0BU9Y7GeT/AKmZfypS8u0s5hGI44Wz7vYQIx8MtM5ycc8Crc+zPB2nM8lhFLcE7ytkn6nFH/ZFkGU/YrUldlLQoSu+dttqigXRl+KcVissXEd0kLOoWRkngU5HulnjViBjYACrLgt0t/Bl5u2YAHUbiSbr4ui49BVy0ARQF2K+6eek+XhSdxKlvcRu5AMjaATQ5oXALG/cg4b79k8AKWiYntANnUkgeY5igwXJe+dzyO2KIyNDxAyg4jlx8W5H6YrmU0zYjFe09lxBvaaO7srQzRGLvss6wkHoAdLflVZxlOM8T4atuyaGUgqZrppMHqDsBj0FbK71CaTJ3DH86rJkznIzmvRYk6i32jmzly0ZiCx4lDCI3NiFxjKtM+2OgZyB8qq7f2furVSXvbZ3JzqNmjkehYZreRWUd3FiE6J0GSjcpB4jwPlVXcW7xuVdCreBFOhki24+RcoutxlJuBs9+123EJ0bAwIlC42x/W1AvOELcxrHc3V1KqkkEuBnOPAeVaSWI+FJyx45in2JdlEeE2ywmMduyldJDTMdvntS68JsoSGS1iDA5DEZIq3dCCeo8KE653piZXZVCyt42LR28Sk88IK48S5B0rkddIp5koToMUakVRXSBhgjJpWUEE1ZyJz3pKVPCmJ2C0VshOdhQHG5NNyIN6Ay7cqaugGLOuxFVZGCRVwwqqdfvWXBzqNYdYumMxHNJYAj0NeZQvL5133RgfHzrhGy+lYGaEcbffxqOPSiAZUjqKiy4oWy0RA3ogUaSNhnlXUXAyeVcJyaEKuAZRh0+VQPXxop3ro5E8/WrTBoEFxuefhXj7vxqZzvUcDSc7VCUD6VzG2k8+lSJUeNcGPA1YIOvV1yNWwr1Qh9TAqSLlc10DcURBtXeZiBSLhDtSpTvCrBlJBWg/Z23xj51IspoQn1KoYHlUZXYKmCRkeNNzWzMMY61z7LqUAqTjyo1JFNC1vKYzjTnPWrGyYvdwFlAzIBjx3oMdhmQbkAHerCG3EVxC5fSquCSR0zSdRJbH+BuFPcgalTMw0kbkc80wseDsT6VGKEB3cEEEnBHLFMqh6UhP2oZLtguxDHJx6kUZ1aVAsm4xjGMflUwmOlFC4xQS57LjYO2t44I+zWNVQ76QoxQpuE2UzangVtscunrToBruMiqsLor7ThdnZljbwdmTt3Xbp158/Ot2OAcOurG3uRaozdkMsPe5DJzWVRPLrW24JchuEQrndVKYHPINc/XKoqUeDVppW2mZS+9heFXcxmJl1EEEdoeoxyGKW4n7KLxHsZLmITfZ0CxFJCmw6YI3O3OtqyvKcBdPnjeokKBggHJxXN9ScJqbd0bNqcXGuz57Lwn7KGEtvcRIRuQVAOfMLzoSWEAQKlxdkDfe5bb5VvLosYvdyOWRVPc2du0EjGJdYUkaRg5x5V1cetc17kY56dLpmSl4Nw4yszRM5Y5YNK+/wBAri8PsGZO0tIpCg0qZAXIHh3s1bC0cqMjc15eHOTyrdBRrkxS3XwDtuyhBSG2giVjkiOJVBPoBT6sTp7qjzCgV234W5IyQKeXh5XmTirco+CkpvslbsxUAk48M7U/DGcZUkeXSgxWxTGxqygiwBtSZSColGBtqyDyz0qwhRVIIGTQY0pgRPgdmwU5HvDIxSZMZFDkbnOBzpqMEY1HJ8BS8EYVhrB9elWcSDoMVmk6HRIordFxRlibbVuaIBRAKS5WM6B6eleK+VFA2rxXrQk3CsqAgbczVTxS3Z5IyisSNlwNlPiTV4wy23SgTqDE+3M1T9yphxlTsw9wnFWvfs9kqqhTU0uRzIyBv471x/tS8PRZ1mExfvu7Zbw+FXkSg34Y8jFE3Pnsf401e2UF3GVmjztgEbEehpWKKmnGumNlNxaZT6O0hVxvkZyetKSwHwqzS3NvCIdWoJsDjGRS0q10cb4oxzXJVlWicOhwynIPhT88UXEbTtFXGTh06q3l+lLTLtQIJza3IkA1LyZfEeFVlxuauPaLxz2un0V99wx4dTR5dAN9u8vqOo8/wAqppVr6ARHOiyI2VbdHGx+PmKpOIcEWXLRYjc9PwN/A0OHV/y5AsmC+YmOeMZNLyRnOeRqyubaWCUxyoyON8EUo610YyTVoyNUIMOmMGhOopt0yN+dAZSNj86YmUJuhO1KSxZFWTLvml3T50aZKKeSLnSrx4q4khyTScsBwdqcpCnErGQ1XS4Ejgj4irp4iDyqpu00zkYrPrP2IPF2Ksh6b+ldKEKMjFSA0qT1JxUox3s5xjc1zDQkAbKqMDc/lUgQ2xGDXXOpiT1rhFU6L5Jsvd5br+VCxU1kK8xlfCvHY7HbpVPgsH5dakeWnG43ryjmfConIwc/GoQ5jG1DfYAUcrk5HX6UBjlj4dKiKYM1490Y6miKu2o8qiyg5OSM+NWBQI+leqTKRXqsh9XxvmiRjO2etFgiL5AA28aMluApHXyruOSMSQDG2DXdNGEDCME1EpjY1VkAEDO9djANTdDivRJU8F0TVPnTMCj7TFqGRrB+tQVaNCubhPIg1l1HOOX4H4eJo5JHpuJdC4752+NTQeHTpRJlK3UoP75/OvKuT4UvE/4cfwHNXNnguelTVDnNTQdCMUZVHhRNlJAtPlXgoPSj6DXHTAqrL2g1Xb41f+zcg7WaIjfAYfkf0qljQEHbNP8AC5Ps98shIUHu5zWfUx3Y2h2H2yTNTJKVjOk4A2yOfpSFyv2Hh8jNkmLGd9/OrO3i7SVC3uJ3ifE1W+0RMXBpGXIYuD9a4UVuntOi+FYtGXFiGfrnPzNVnZYZ1wSrZ3PTarjh86Xdh2ewbGcdM0ukJedI1HvHbzrXh9strFZOVYK3sVKDOPjRGtI1OxxVinD5yMYxUv2VK3M10PVV9mRQfwVqxopJGKises417VbngjkZDCirwaRV7oG/jU9WK8guEvgroYAoBzkU2iL+GiNbvEuHUjwNeWMir3WA40TQYpuMbZoUUZI5b03GuBQstIPCMeVNINIwu3lS8Y5UwtJkNQZCeuRRloS8sGpg4PP4GksIMK63LNBE6a1TvZbJGFPTzpDid/d209ssFnLOjsS3ZEZAA6g7YyehoW6BUbdFlpwaXmB7I/p/KhQ8US4Vw0M8TqcFZExg/kfhU2miZXVZFJVckZ3A9KFTTDUZLso5D2N/bxHkLZNzz94CrGTeqni88Vvxq2DuF1waQNzybPTptVs5yvhQaf8AfNfcdl/bFlfPGFcuMZJ3PjSMq86sZjVdIcZB6VviZpCMwpCVasZaRmHOnRFslw+7EMnYTNiGQ+9+43j/ABq3KsJGicKJB0PuuPHyNZqUbVa8NvxdRLaXB+9QYifHMeB9Ky6rB/PH+pow5P5WEu7CC8h7OVNgcjxU+RrJcR4PcWRZipeEYzIBt8R0/KtycnZh3up8aiy564PjjPz8qz4tRLH10MyYlPs+ZPHgUB08RW04n7PxzantQsM3Ps/92/8ApPQ+XL0rK3MDwytHIjI6nBVhuK62HPHIuDFkxSh2VskeAcD4UPQDyp1kztjegvGMgjY09SAFHi2pZ4gcjFWDcyDsaGybZolIlFRJbjcY86peI2+mYMeRFaeVN81R8UjLNGfI0Gpl/DLxx9xSHPQ4HhXMkoQTmmOyJPKu9mE7uASedc1SH7WJY2rxBJwBk+FMvEp5AqfnQzE+rC4PmKiKcWgJjx7zAfWuF1AAAJ8ztRJEAO245UIjB5VYLPAlk5cj0r2g9dhXYzgMK6frUboJLyRJCZXGrahaVx+KiPyHltQyPlUsFnn54HIVHFEdSTkdRmoYxz2FQhEJn+derjnUfLoK9UIfbLaDSxB8aaSDG4AxSEUjA7HIz41Y29wdB2rszTMkWmDkiGkEDHlSpi8vrViyxyRjPOlTFpbbNVFlyiJMldiT7xu6QmPe5nPpTfZpk6t80W2WIsRiqnyiQVMmOEz6FdNLKwBA5HBqJsrmDLtAWxyCkHNaUW/a8PgaLuyKgx542I+lLOxKd7K+tcaeryO4tnRjggmpJGbW7WYmWVGhZiW0Scxv5VZ21ss6g60xyADDNQmTTISGVQxwp8TXYbWOTVnS7g4wBjenQz+yvgGWFbrH14WxODgHpkc6J+z2jG+46EVO04RbvFrzKGDc0lddx12NWqwlFAPewMb1aysjxoozbMCRg1I2m3eOKsrh2t42ZosqP3Mk/Dxqua/iaZkYMmno2xPwqnqYr93BFhb6CRWXcOPGvCx+7GWG+9SjuwSVUgZG38asIwjKM774q/UTXDsmyn0CE3EOwSFZsLtkqME/GlbWH7RM0FxI0h7xOo58P51Yg93SQHbG4G2aUspY14qyak1hMlQcEA6elYcq2zhtVcmjHzGVjlxwCB4B2ClCCCVB94eG5xReG2c0V4pkhdUQMcsfljxp5JlwATvjeiJOM8jsKa+ewEx5AMUUKppBbkrtgb8smjCfkcjHWgcWXaGwozU8eFIfawH3kGD0piOVGXBcEHfnQuLRdo7JEJBgqD60p9jJY4xtzxVgpU45E9KnkCijkcQJQTFY7bCjTq364oht2BPXbYmjGVQedRM8ePeolOQO2IFVbGMgHPhRk55yfDFQ7aMnGoV7UjAg7qRy8aJtg0hhVGwO++d6MCOeOdVC3wtrwW0xIV/8Fj18QfntT4lGOTfKl9hVQySCMVFiceIoYcEc6jJJpQny8aqmTgFOEIEqodXusAeQ9KWKo0jDQO8uCSOY8P68ahxCS4WNZY42k7MMWiGPvBgfHbf1oNtcdupI1GRVBZScYYjOCPjWTURppj8T4I3HDbe4ninZCJo1ZVcHkCMHapzyzw4I0yJkDBOCBj6nOPCjvLpXUwwAMuc8qXkm7ZPu42IU5JIpMMkou0McVJUxWW7RWKTZhbOB2mAG9DypaUjOR1pi/XtnjXQGUncc6HxLhrGxmNuFWUqe4SQreOfDbrW7Hqn5QieD4YhIedKS86YOoKAxBI6ilpK6UTG+BSSl9bI4dSQwOQRzBpmQbdaWcU6rBs09jerxO1ZyFW5iH3ijbUP3gPzopI67jrjpWUtbqSyuVniOGGx8weYrS2twLuDt1UgEnI8K5Opwem7XRtxZNyp9hCBpK/h8KRvuHW/EIwky5YDusDhl9D/GnTt4YPIjka50zv8AqKQm4u0MaT4Zi+I8EksX1n7yEHZwPd8mHQ/SqeVPKvpZAYYYDHhVFxL2cSXVLaaY3O+j8B9PD05elb8Os8TM88H/AKmKaME8utCMeCdQ2PKrGe2eCUpKjI45qwwaCy7ZFb1K+UZ6aK6SHuk42FUPE1GEOrG5G9aaRCA2BtjlWd40im0jYfv71MjvG0SHElRUvhBgDvEb+VLdTUxKU7rLqTw61MKrDUneXr4iuY0ak0wPM+dQfbYfGjPgHC9eZoLYqFMEeo6HnQXXTz3B5GjsK5gae8PSiTAasEo0qcjc9K4Qp64PnUyOeedQO9TsqjxQnO2x8KAVNNQRPNcJHH7zHbpXJEjX3pVYj3u6TvRpAtipU+716UPUQANRx86acREgayDj92hFI5HA1NqPltVg8AdfiB8q9UTXqgJ9K9muK/bLcwOQJogBz95fGtBFIwU77V8t4fcvb30Tq7J3xkg74zX0dZmGdsjnXZwSeSPJkyLYyzjlOiiLNkYNVSXYCgV37aRnA3pnptgrJRYswHWj2elnOBzqlFyWJzmm7S60daB43QccnJt7V8WMZUMxiY5AGdjSUsUslws0g0pnuR9SehNI8P421pqQoHR8E5OCMV28432oCorKN8AnOBXCzaPI8ja6Opjzw2peSCgXXErkKAYUB1AH5fPFTjZbaeQurFhj4jocVX8LnEUgnzu5yy+O3L60/dyrOwcKylUwMDNSOnm6fhhSyxXHkt+EXSyWZfVsZGxn1qzWZNssKzttKOxXSrIP3TzptGY4JPwrU8XAneWU80bAZYqM9DjPlSsqwSHLBc+OOdLTNlcEnzxzpaYPDMY3OGHj1paUVPZLyFb27kXlrGBaxhdgcgAcufKoskKzFmQK5GM8s0nw69dv7qVUY3VieflinMAa++Gcd3f96ubnxyxzdmrHLcji28aghc8yd2NVH7Ojtr9boNI769ZJbc7Yx5Dyq8Re6uvGoikb0FACQccskbZ8M0EZ21YVUuCa8VMaAPbsxJ/Cfj1xU04taKzk6om5sWU4qvBORt1rjactkDBG9bVMS4pl3HfwS7JKjE74BBPyphbkYrMvBDIoDxLgDAyOVTtOFhJRcR3tyAUKY1Z28s0yEt7pCpLars0P2lQ+RtTCX6gbY+VUyK6ZDuXAxhm974mjKad6aYney5j4h4/QUU3xI2qnjboaYRqD00XvY/27MdzUu1YDnSobzqQar2lWxkOc5zRA+wNKhjzoittmqouwXFYRcWRLblDqyOePL8/hS9hxmWGVLK706sgLK7Y1Dp6nl4U+pyiggEdR5GspxKIpM8LAtoOkHy6GsmaLTU4mjG01tZuFkbPeFQmfA3JIJxgCsrwnj7WoFpxJyQP8KbBJb/KepPhWgaZnCsgIB3wwIPy50yDU1aAknF0w3a63yNYAHLlvSqMI+ITITvNh1PiRzH5VwOSGJcg7Zwcf1zqkmjsP2tKEkZL23tAQoY4RNRYE+JyT86HLjUo0FjlTLHjSSz8NkEFwYWZgoYDcEnGSKTuYmS2SdHdnjQd0MR2hxjp54NV8vtFFxGyiMMgbvq7kbFsHkR9afWad7q3AizbSRSan140tkEDHpmuZo5qWaWJ88GzPGUcakGgnlubRJ49IdVIZAeWDvjNFhvZtUhklQ4GcPtmqw3R4VeEtloyQ2epHI/15U7dqv2glVAUqCPPzrRDC/U2PgXKa2bkKzadWUIKkZGOnlSr86ZegOK7MFSo5snbsVkpdhvTLigsBTkCKsBTvCuJNw+Yq4L27++g6f5h5ilSOdCYb1U4KcdrCUmnaNjIqqA6MGicalYeHQ0Mlsgg4YfIiqnhPFVhj+y3BOj8DH8OeY/WrVh2biMnKHeNhyri5Mbxy2s3wmpK0d2bGNjz8q7z22BJ5Vz3TvtmvHIBOCR1HPNLCFL2yhvYTHcRhv3TyZfQ/pWS4lwiawYvjVDzDeA8x0rcZBUHOV6HO4+PWosiMCsg1Kf6zTsWeWN8ASgpdnzR4ydgKz/F7YjhspbmrAj519O4h7Pxys0lowjfqjDAPPw5Vh+O2cttbzxXCFCBuPHly8eldGOeOSDozPG4yMKYdu8QvrzqUYCuuB1xk0w65Yk8qCRvyxg1i3Dtoo0rBsMAefrXNSucDIJ5A16dSszjpqNeiXctjYcvWm8CubokxHu4yo23qEi6hlN/LwqbDnUG29RQWHQBt/WuFdhuM+FHYKyl2HLqOtKtvknmaNAPhjnD3WG8hkchV1gEnoOtLz27drIRLDoZiR94N96GXDDD58jUCuByBHiKO+KFtWdMKnc3EQ6cyf0qKxIkqv28bBSDgZ/hXQNSYH71cb9wDYc6m4pQQHSh3Oa9U/UV6hthUgqOysGB3ByK0Nn7VS5WO7RWXkXUYOPSs4TtjpXAd62Y8ssb4ZnlBS7Po0cquiuhyrDII3yKIGHjVJ7OTGThzITvG2B5A71dKBXcg1OKkYJ+10TXdseNPwoABkb0lEFMgG9WaJJ2QkI7mdKnxpGbIotJ+RuKDkm14JIcHyxU+zD425YqAY+OcnFFV8qTj8VZ8y9rH4XclYZbcW7oiElQF3O/MU8Cdhil3ZGeLs5FcmFCSrA4O+30ppCMVi0bcsEb+DVnVZWFjGDTKE4pZSego8ecb05oBHZuXOvXMf2q0hkQDtIxp38uldZNQrsGpFkjHTvr61i1cLhuXaNGGVOn5K+1kVyXUNz6iriO4jtYpJdJVBu2ojGceJqtlAgmjlVQIpSAw/dbr8KPdmJEUSRGQyEJpUZwp5/CkTnHPiuTquxkYvHOl5CLxU6pAyiVVYhtDjKEb0fh/Fre/t3BTUuSrodzseeKp3bRaXE/2J4su40qAWfoDt41S2cEEV3HNcJLCFcuna7HJPXG1c7UZcUcsYwdp/Brxwk4Ny7Ro3jAmaOGdgucgEg4H511fupQrYYlTjcmlxqjljlmv0MfbsMFVAYOO4mfL612UPFxZdmKGM4HMA9f0rpy01x9rsyLNzTQ3HaNITI8neYk4AyAOg3p+GMxqQDnwGOVBizpGrOfOmAdq0Y8ahFKjPPI5Sfwdb1qa5qBOTUlplCgqZzTKYzSq9d6Oh250LRdjAapg5oINTDGhoJMLnap57p5ULmfOoydoQnZsq94FtQzlevxoaLGi2Kq+Mw5ZLlRnbQ36frVjzFCXFxbFZEKhsgrnJGDsf1oJRtUFGVOzLTW32iMpp1dVIqx4LxST/wCh3bFmRfupW/EPA+YoE8b2dyUOw6Hx8xULloGgDLgODkEeIrBJyxvg2JKa5NDCxO52GdvPzrD+0I4vwW4kvsQXUUpIz3tfkp3Gdqt+D8d13Bsrpl1A6Y5RyY9QfOn+PWUXEOH9jKDnUSjA40Ng7/pTskIZ8QqEpYsnJg7H2vvLiWGJuHWoG4JVSuQPny+NXi8blle3VZGglV8CNX1I2fLbI8jg1U29ra2Efa3LqNCgNI5xjJwBnzOK1fDrWOK2QNAEkQDdlGSPGuBptPDLqE8Kca8nV1E1jxe7n7HrvtbqONJY+xulGSu+hs88N8ORpu3Mhs4VlxqRdO3h0o7qHjKOMr1BpM9pbyYyGiJJGdgvl/W1eqUFdnCc3VBGFAcUbWrjwPh1/rzobU5CxZ1oDLT620ku6jbxo0cAgYFgvxq3NItRbKUqTkYobRHwNaM2/bscRqPOhHh25LsT4AUHrLyH6bZmypUjIxWk4XIby1FvKo7Rc6emofxoT20SckHqd6XaUxtqQkEHII2IpeZLLGg4LYy2I0nS/MfH41ENhgA2luh5j/yqIvUu4EkY6ZwdLjxPiPWu5V173r6fyrmOLi6ZqTvoltkkAIfxLzB8xXP4VEE7BtjyzXScAHOMnFCWdzkEfTrVfxLhsPE7RraeFWVlKk5IPqPA8vlTxYc/r/XSuZyMGorRD5Zxz2KvOHxGW1zcRgEldtY59Bz2x5+VY3HfwdsbnPhX6EbQ6MjgkHcGsp7R+xdrxoPOpS3u+fbRjZ9vxL19R9aZGXySkz4vIdTlj1oilVjUEjPM+tWXEeC3nB52hu4sAsdEinKsM9D+nOkCmvuj3hyrRdmfbQEyKeR29KjqBzgE1IxN4c64RpAHXrUolsFKcgKoOBuc+NAKtjl9aZcd4+tQbY4okwGrFyuBknnXUKYbJcH0BB+tTPLB3BociGMAc+pNGmA1Qxe2ZtETJY6lDOrYBUknA8+WfjSoeMqBpYN46v5U1f3j3cULuVBwVKqOWk7E/M1X9at14KCcug+terisxHLOOteoaLtEuQ351z61IJk7bevSvYA6/KniqNN7LL9zOda94ju53GOtaFeW9ZT2XnCcRMJXaVSM+BG9awgqcEcq7mkleJUYMyanYSIsJEIxhc7EbH1rUWMSzcP0MF1g6iu/I8qzdqmqRQx0qSBnHnV812Ib9Ird93QhEK5GBjIzXE+qy/8AJhjh32dTQ/4TcgklmkfeMeQAdlJOTSqxp2elzKMdVxv8MVbKWuIMR41bKzeHnVddxJa3oj1FlABBJ3NZFmyNuDZp9OC5SOSIttDEUcKRGsQTSBsMnJ8TvXY78qoU6WfHpmjSuHGopGGHJm6+YFVOeykkR3bnlmz4+ApmDJKMaByRUmWsXEjga4enNW2po8TSFAzwzZ66F1ADzqsNsyhwrhiMFQBjIpiF3jyZMaQN28a0Q1Cl2+BUsVdIuldSM8t+RocsoBGnB33B5YpASgnCygg+Y2rrFmwFI8c86a9k41YFSg1wXMcEU0bqx7r51E9G/req+aOGfNndBi6DIZWK5HqDRLQtKCudJBAB9OX6ivX9vJLBHJAv3iMO9nGB1rjKseTnk3VujwZTi9ubK5U2FzdojDU6dscDwHj4neu2LXzEL2jSJg5SQg6vLOM1YEicSTNghjyPSh9nNHeBgwEGkAIqgEnO+T6Vi1OKOTVLFBKpGvFJwwOUu0E4XZXMYQySIYxhipXVj08PhWkBWQEdSKUsFxEBjnmmTEOajYncfqPOvR4sEMKqCONlySnK2ETIOk9ORo4O1LA557jow/WjxnUNqYxRPNTU1DHnUhUKCqTk+tFB2oC8zRRQ0XYZTtRA1BG1TBoWiJhQ1dB578qHmuqdqFoNMPq2pYxtlj27ojLyB5Hx3/Kp687DnUI1K6nMjuWOQDyTbkKFxUuwk2uiqvLTiL3CmRlltgrZJfSQdsZGPWicN4OtyZknd4ghGECjGPXPwq2LAqfDFQhmFvNGzDyYDkRjf8qw5tGmnKLd/k049S/2uhK79mF+zn7M6llBZdWxJ6biiS8OvHjhhbTL922ZdgAdsA56+Y8K0BC5yrDfwPOoZJYHAwNsmuZGcoPhmtpSXKMhH7O3chm7aJQuwADjcgg5H9CrV0MOkvFIO6F2Qty9M1aS3EcM5jk7oYagfzrkpIXKtqycLU02R4L2+Qsy9atxTrdwSFdMq5ZdQGcEj0rzhXXukHqMfnTaSlXaNs6VPzHj51WXdjouSVjEaHBBUaR9K6MNc26aMktMlymcKgjujkQCpOMeYPSvRhzgZLrnBONx6iq7iVxb2l8sgvpIkKLlVQt13646fChD2is4xkySPMoOHEeK34pymr20ZckYwfZsbSKMoG1AjyokqQ+AzWJ/2wtgxZY5kfqQBhvhn+dQf24jAH91cnzYAULwzbsNZYVRr3cIe6AKVknO/jWSl9t8juWeP9Umf0pST2zuge7bQKM9ST+tGsL8lPKjVzTMcgilWYk7ECsjP7WXz/7uFR5Lmk29o+IE41r8EFNWOgPURtGd4nEndYjoRsfWrqBxParcR+7nBGclD4H1r5WeNcQbIa4YfSmOHe0XEOH3i3C3DMPdZH3Vx4Ef1ik6jBvXHYcMtPno+n88jG46VzPjvQba8t7+xivrcnsZcgAnJjYc1Pp+W9EbdckdcGuUazp2PM4+ornQ/nUQ2Bv+e9cJ0jV08aos6Dg5BK+QPI/HlXsgcivLbAqJ8jjfGK75bg+PQ/CoQrL3hKXSsJIkeJ8ZBwUb58j61j+O/wBnTlJrngn3hRctZlsv6oevpz9a+hggEHJVj1B51BlBK6sgrk5Axj0olNoqkfnqaF4pWilRkkQlWVhgg+BFAI3r7nxj2dsOPxlr2Ml9OEnRQJB556+hr5j7Q+x3EeBB7jQbuyB2miBwo/zjmvL086dCafAEo1yZeWVUnYFeR8aHqRgzZIwQNxUJSWcs3M1FOTg+H5VoozbnZLKc9QPlQNbBic8+leO/KoVEqKbDYDwlipGDjI5UIpgas93xo0RzCyHYagfpQZFfmRt0xuKi7IugZfPjjpvXq5ivUQA3oHQmoqjE0UQncsc1EQ5bGqnbQdyDWUk9tdRzQgdqhyvUGtIntRMsgEtlHgc9LnPwrPRa1XCkDw3qel33YA/HlTseTLDiPQMowl2buLiVrcRxyJKFQYL6jjT5GiwzCPiNtezSvpWY9kpGxU4Gw/Ws3w1oLLh4kljWSTXrVCdvAE0CW+ubq8FxI+4Pd0nG3gPKsGSOTPnc6NcFDHBRs+lX1zJw0JcKpKqxEg8F5g1Wcd4lZcU4dKYZonk06sK+68tqZEZ4xw63lLRsvY5ZCxHexg7j4isxJ+zorjsH4YU0ktkTEg+oNY/Xlik042bFjU0uS09nrmWa3xcTvLowV7Rs48d6sTqu5Jx2KBjnDhwS2MaT5bE/KqCWHhzWKNHHNEpfG8mw/lQrO6t7OXtrZHSUggl3yPlWvRaxZEouD/InU4HFuSZsLV0+yorAq4wpJ8c8qLJCsqENkZ6qcH51ml43dsCGkjI54Cjn8qk3GbwqT2ozkcgK6UVjUdtcGNublZpRGwYMpJZSCN8A+taRLa1nj7QQQksN8oDXzf8Aa90WJ7Y7VueD3QawglVgySID8cYNYNVp8W28ao04cs2/cxx7C1ZgTAgPkMflQ5eGwsBp7RB1CSEA+tOOwYAqRnmB41zVqXbmOdcpqKfJqTZXPwW0KEfegHnh+f0oUnBYABpklCgYwTq/OrhgSuetQkwAauDjGSkuGi221TK1bWWAoIp9iT76A1IC7V9LtbsCOisP1os0yo65P4q48ydsMMK348sn/MZ5Qj8A1+1CQnsYzjqJcZHy50GS9aKFrhoJIlTmcqVPkd8irBZFLDDAnONqreKBJeFXaEhXVCcnqBvj6U9ZJ+GKeOPwSXjlkVBll7J8ZKsM4+I2NE/bvDxv9pH/ACn+FYIlCCM4Ar2pgx3JGOZ51sjdcmSVXwbv/aKwDHDOw8lrx9prIbhJj8KxCucagcjlyruW5azmo3RRtf8AamAcreQ/8QqLe1cY3W2b4tWOBOcEsfGvdqykb9zzOKW5/YtRbNcfaxznTbIB5sai3tXMVJ+zR45Y1GssJcjCqO8cZJwB8a52uA3d3A5A0tTvkNquDTN7WXQ7qRQgDrgmhH2rv9AAMIGOYT+dZszMWBwNxmvazgAiiTsF2i7k9ouJOpBuWCnwAFD/AGxfzXEaG8mUE8wcGqc6hy3OeVRMjdoWySRjOKkm6oke7PqPAOLdvZJbNIXlUYVm97Hgaumm7KMlsBAdIIO+a+dezfHJbR5HWBGH49Q3+B51Y2ftTcJfGOeRcF8tGVG4O+x64FcbPpmsjSZ1MeROJqeJIJ4knj73Z5yOuK5w+dJUNuz7c1Pj5UOe/hgzKSvZvIo1E7YKn9cCkmjtppNcFzCjZ3SSTQR6GskYMa2qLVOzeZk5q+w+HnSvEcwQS4HaJjJU4yPTxpJ+JQMHiWRZTA6aij6ufUHriice4zDZ8JMkTIZ37oU41bg748Kbjxyc1GgZSSjZiePOJZ4WjwyaMj51Svq36AjnUppXfm5PP5nc0tkg5L7+OK9Djhsikjk5HulZJsAnY/GhiQ5O23XyrjSZXBbJNQJwxww8sCmLkAkWIJ0ncDr+lQLEL0z4VzzBGrG+a4CGONW/h1qyzjM2M5+VQLHnjBrpLKNzq8cV4Ag5xv41dFWR3OSTk1wH3sg/pXTsc4rw2JYYxnbNRLksv/Zv2ifgs7RSoZbKUjtYxzB6MvmPrX0UMj28dxBIs0EiakdTsy/pjw6V8bU4OeQrSey/tL+y5ja3mX4fM3fxuYz++B+Y6isWq0trfHs04c1e1m/YENqAOCAw9fCuDPMFlON96iQ0UckeoNoAZSD7yEE5B+RqTh9CjTpcdQRuPGuaajwONiNq5gljoA9K4TkHIGSPHrXCNsZPlVEJZzvvQWJkfQPcG7Hx8q7JIEwoG56V1QEGgE4zvnxqiwgbf+FRIGeW+a5k8ug8q52ir75G3QA/wqijF+0X9nljxRXuOG6bW5wSQPcY+Y6Z8R9a+Y8R4DxLg12Ib62eMNkB+asPEH+jX3troP7lrK58OX6Vya1/adrJDccMkaFhpdZSNPrvToZZR7AljUj84tE/Rc+lBPPkRX1L2g/s3wzy8IlXV/8AdZJAfgG/Q/OvnVxbz2lxJb3EbxSxkq8ci4Ix61ojNSESxtC6ZEbKAejHyqBJB2pi1uHRbsKxUSw6CAOY1qceXL6UsaNgR8kWK53Xc+G1eqMh73KvVKKfZY6hpyM5ry4PKohgMAkUaF0RwzxrIvVTn9K6aXHBlVWeBwMfpU0RmOATzo8N1AHzJYxMv7oZgfmc1b2/FLGNVA4RC+Buxb9MfXrScuXJBcQb/wAh+PFCT5kVbt3dPPTsB0H8a5GrFgScZ6mvp3s3w/gfGeDRXR4XbLKGKyLp3DD+Oxqzk9mOCbY4bArZzkLzrM9dt9rhyaP0yk73GY9jLtZLWS0d8uh1p5jr/XnSvEbQJxbtHy8crEA+nOt1HwfhsEqTQ2UETgkAomPnip3PC7CdFEtrC2DndcYrm6iXqSco8WbcT2JJnzDjktzEkUcj4jEmpFCjlillCk6hnJ6Yr6VecI4bK2puH2xCnmUB5Co23CrBVwLKADc7oK06WXpY0kuReVb5NswVqya8YGfIUxKgGO9y33rWtw+0WRlFtEFx3TpHyqcHCrMwH7kctvGtvqt80ZliS8mJ7QKrEn0rW8EnluOEERBfuTpJ3Onwz/GqTjafY+JyQwIOyAUjIzjbJ3qtWWZc6cgHY6dqtvJkjwqB9sH2beL2kjjRPtEiYyVcR51qQeorUwTxPCjR4CFcjHhXx5A3aK3XUDnPnW74ddtBcyQiQMjb4B5E+FYtVpVt3LsfizWaYyBxpG/TagRzExKGYE8jnrSV1cLbQGSVmVfeJFVy3iCEyI4bJyy53Q1z4QcjS+C1cLIzFhgDbV4UlxIKLdZEJJB6UpLxCFUMbTZ1kgBtt+gpyaVZrYE/iGc4rVCEk1wKbTK77U8TIQ5Kk4Pe3FdubgTWdyct/hEnPUYpC5fstQ0YIOS9UzXDiMxCRwp5j9K6eHHF25Ix5cjjwiLMCRg48wN64LiAbPLpOcnMmKrOLMBYvg5IYYYHBrNqMnJG3Umjlk2OhKjuNsvErMBtNxEMc8PyptJX/dQht1rFxv8A3eQIcDHXrWxsGWfh9u7MupoxnpvV4p77smSG2qGELkZIUbdTUZFYoFC78855UQQg6cYbPTJzRo4guyqNvPlRySfQCbE5E/CSSABsB1oICjIC/OrGSHVzd8b7afpSfYFsZjY0v01VB7ubIKjPjIxjx3qY1YA8OldYlRso+dRVsZyoBHLejjFIGVskQxYbb7nNewdTEnGT86lq1k5G2MCu26GWRYl3LHFW4pdlJ2W3D4uzsS3VwWPp/X51XXcbi/1AEKFxn0wM1ciLQwVGZVXAXy8vkDTQ4as/DZ2kQF1DEP16np5VxNRkqakzr4Ye2irjuL7iDQ2pudKwjTuNsE9R1PnSMtzLJcgPISFJUDO21O8LwLw48qQvVWO+ZFGAshyx8z/KlaebesyY/HFDJwSwxkFt+JT2inS3dYgsCOZGcfnS813JdFpZG1E7bmgtiToPSoBkUadPXljnXaWOnaRyXPimyMshIJO59aGu+zsoJBxmpSYYk4UeGKEzqoGFDEb7jemUxfB1G2UasN6Vwt3tt/Tal2lcHng8wKj2pzzq02i6Qx727e94V2MFZFI2J5EgHnS+pgxwdq8znSCNsHlVyVouMqdh1ZM/eNoPImvSoAe4xI6EdaDMSxBAwGHXrQxJJG+7L44oLklwG6vkMz6G0sMEeXOoDvKM5Azkbc6526spHL/V/Gos2ExqJA3Cn9DRKfyV6fwTLZOwwB5VAOckgbVEsQAQN/Ouq+Rgk4x0o1yDyma72f8Aas2qxWN+S9qvdjlJ3iB6HxX8vStorFbTGBIbffn70R3DA+X5V8bbPLJIHWtd7I+1a2Tx2HEJMwA4imJ/w881Pip+lYdTpf54I0Ys3iRue5gMmw6fGos4RWZtgOZqMeY45Ydm7BgVYH3ozyqIPaPgnZTgebVzWaiUYcliwyT0xjA8KkcciwzzIHSuSrsO+dPh40s9xEriPVgHkRv/ADqVZBoY222O4A3NRMpQnDYOPT4eNUvE/afhXB5NF5JliNgCCfkN6x3Ev7R4ShWxtC2RsZO6F/OiWNvwU5Jdn0t7yQDH2pgPAf8AnvWb457S2HDvu7niDSyndYg4Y/IfrXyW/wDaHinEXY3F5KQfwKxC49KRt7W4vJMQwyzsx2WNSxY/CmLFGPMmL9W+Io2N9/aHeFmSyt0jTkDIMn1xWb4j7QcQ4rKrcQlW5CJoQMijQuc4XAB/OnIvZe90drxOa3sIjuGnkGvHko3+HOvEezlgg0rc8Rl8Sezjz1G25+lLefHdQV/j/kNQn3LgrbC3t5J5XzlRBJ3AQG1FCFwDz72M46ZpK5tJ7URtNE6LIgdCwxqU8iPKrCfjk89ykVuIrKHOMQLp5jScnmdqqmd8jvMccsnlT4ubrdwJnsV7TyKpBLn0r1RMmQMqv5V6mix0a9Wyg+WKl94OYAHlUcNtlq4UbG7j5110jCF0745Zo8Z7MOVJIO24wcUqM7ZbPxpjvaRlwANzVyqQUXt5Np7HSXvD/wC9INdhKdEne3BGN8eWfzr6KJYigkE6kEZ7u9fJfZrjQ4XOYppFezl2kXw863GrMSyWUokt33Uq/wDCuRrcUt9nR081tpF7JOIypLnBOwxua41/BoJdNS5wRjNZ7+9T5GNC/iY+H60pxjiK2vCWhiJ1ttk/U1h9NGncaKW7ieBm0DQvLvYFLw35lONIUctjWFi9o7yOye2cxyLjALLuP409wfiDXBdDu5GratMML2bhbmt201c08e4Y4ztUoL+KJdJOSDv5jxqlaZXVtcoReuqqqa+MjMsROke6Sd6048Ln2xU8ij4LLi4S5umlym0YBzvvk9PSqcwu493Y9KPDeDRh4g4Jxu2DUrqWKRdQhC7YBVjWtY0lRmlJvkSXV2oGknoK1XszcyTzt26gqowpA3+NZWKMZZsbAZrV+zkbRR6iCQx5Cs+re2DHYFbQ3x2Z+xaFkyhydefAbDHxzWevoVj0yo7hjhSM7cs1oOMuJUjwDzOQRWdu5C1mr74L1w4TfrY2vudJx/hyEhyUnUd+vnWl4Zfw/stRPIpVCUYM248MfDFZQvpTff4+dSjcPk5ANeieOLqzlKbSdFlxO+WeQJET2S/vDBY1XEjfVgbVGQqTknl0xUNa9RtyyTTG7E18kLi0a4gMduitK+2GbH1NDT2Kv5GUvc2yg7nGokfSnLXAu4wQMBgTvWrVgFAPxrzf1nWZdPkUcfk6uhwQywbkUVl7Bo66jxMtGw3CwYPzJNGNtFwzFkk7FY+6GYZPoau4bsx7JjG4HkRWfmdzeXTu4zr1EEZ2NZ/o2r1GXUuOSVqhuvwYoYU4rkeR1bAV3fG3dXFdk1galjIKjmDk1XJOUKrrynltTfaR6gATnGcE16ucHRxIsm0jEkZ0Z3wB1+PKhrkjUwP+kmpAoxDEnl1qGkqD2eNJ5BjtUUWVfyRfGjJRcnxOCKCMlThPjRmkLRjSO91AHKgHcABSPjUivkuTOKWGSoxv1rQez1oZrlpnGFjGB6n+vrWe7zKDyrb8Jga04UupTrK6328d/wAqRrJ7YV8jNNHdK2CdC1y8gI0sx+n9GrmJFeO9tA+XUKT44ZAM/MGqFGbUCy88A+ZJ3q1nkMV4LrTjSwhkI6ry/MVwNS7aR18SpGX4cdN8y793A9aT4tk3cx0sMSbHoQM05EvY8XkTwOMfOleMd28nyc7ggZ8hU0rT18n8pB5P8D+pXFiCVxnDEVFmYdQB60IOwcAjoMkmvM7KM6cdQcV6eNUcKa9zOl87E/AUI6dR3JGK4zhjkHc/ChMDkJnBJ3NFXkBhGxzYg+VCkKEYxtUe8CBoBx51HvMd1IA6VaRCRCDkSBnevGXGBjIJzmuKX1YCn5VIRyNzXVjx2FWlRVklnzG2dzncUvkEHDbdaYhhbJ1BBnxbnQmVVbS2/mOVDS6Yb6siCCNh08OVc7+nGSU5kYrpZQeeoctq47AsdJ5dCelC1EibQQBAoIIXwA3FSYY3ZgfTnS4bk5wR1AxkimpIi0eu0cOo2ZBkn5HnUcoxaQyMZTToGe9shGPDrQGbG3LrXSFyC+UbO/h8RRtCrD2kUiucbow288f18auU0uyRxOSe3waf2V9qFii+w30uNEbLA7EAaf3CfXcfEeFWU39oXB7aykthZ3FzMp7rAKsZPqTn44r5u0qGRWAZcbjG9cXh9/cXDJaxdvgkhl3Hz5AedcfUqCyO+Dfp17LfJZ3/ALc8SuLgi0CWkZONCnV8z+tVM/Fb+cjt+ITvg5Co+APiKbg9lnSfPE7uK1XGshTrYb8j0+pp5rv2a4SfubV76ZfxzHIz/p5fnWaWrguMa3P7f8lrBJu5OkUFtZ3V85itLSSXU2CI0JyT4n+NWCex08Y7TiV9bWMXUO2p8f6R18ia7ee2HE54uwtuztIAMBIlA2qieSS5dmnkaU6Scsx6b1S/U5O6iv8ANlNYo9cl60vsrwrHZwTcTmH4pW0x59B0pa99seJGMwWixWUGBhLdQuR03HOs67FiSa4rBk7Njjqp8P5UyOkhdzuT+4qWol1Hj8Hp7ma4cvNK8jdSxzUF/wANtPM8x5VFgQSGGCNiKlGp98nAB6czWpRUVSENtvk5Cfv4zt7wqUq6ZXX91iPrXuciyLsQwJGKnc73MrE7Fic+pzUZa4AYNeqDOSduVeq6KssgFGQravWjwpEyYlcDJwMfU0skRbYbnoKtbSwimX79ygUcsY3ruYcM5PhHPnOKRxLCCQ/cu8y43IXAFSltlLlYowoA6nY+lNx2ccIHYy5AxnS5GfWgiCRnaNVfXnocgD9K1PTt+AFkVCZt5u0CKFw2w0770/b3l9wicdiWQk7r0PwqT2tw0q9kWGnYAHY/GioL64JV0GAcd5qTk06UXYzHkbkqNNY8eN7blJFMJYd4qM1U8cm7a9AhyIVjwMjdvE05w+0MELzFVIRcDwJ5UhfA6yw/drzuZQjP28Hax2+GJRKkcRZxs3Wi2t3HaTK8W7KNz0NMQ2E8kAKorKiAtqOMZNQaCKNQz4B/1Vt0cJZMC+DLqGoZWGkvhKoJJLMc8tqGGkJJB3APlS80qBwi6e6N8ComT7tu5zxvWtQdUIlL3B8MFQkg7k1ORiIxl9jv/X1pcIzKGyAOXOpYVTu2c7DfrQ7C1JhrcM8iLgnU2SBW94dH9migTOTp3z51ieG3MMN6rMjPpzpCjO/StTDxmCa6t40Vx2hwMiudrYzfCXBs0zSXLG+M41Rr/kzjxwf51neKKDYRafFa0HGwuqMsOSuPpn9Kz3EyP2ZER4rXBg/4+L8nRf7JFCg5b53NTibEmCTjlS7PoP4veOBXEl3yqkHnmvXvH7eDhb/dQ665BOQD865kAbggjyoJYkDJI+NdijlldY0XUxPjzqbVFWxdtuh2EOXR8Y3yfKtGWPjWeNldROoaEgk4B6Gr8nIHwryv1+UJuEouzt/TYyipKRGNgsDZ5h2I+ZqqimWTiNyWB3VSB6bVaEDQR5n86pJWFneXF3JqWJYsFgM752Hqay/R5xhqbkaNbBzwtIOR2b6TgBvdJ/KpCUl9Sglc9FwRQF4hBPwue+Rj2cQIKkYIbpQLS7FzbJJnBPNf517XHkx5JOMXdHn8mLJjjuaot11Sb5G4xXghX8Qx1pKOV1cdTnkaZWTPPA8s70bikJTbCtHqiYas9QP1pVgVGlu8oHPr/OmUlxrAye6cUFn2BK5BIoUlbDd0iIjKhcFMY8aHcXE5BzLINX+c71OQNrIjOcjwoDCQuNa4A57ZzVSS7aCjfCTDQXt1btmKeQMDkDJxW34VPccSsHku5UZpUDLpQLg58qwAD6Q5B33xjFbLgV3FDw0FXUmOE61zuMDNcfX4bjaXJ0sGTmmysJ/9MEnqT9CaS44ub+ZtX4VOPh/Ku20krXiSSksSOvSicejRrnLFVDRg79cZrlwg8f1BRf8A6m3cp4G18lG2CQ+RuNhmuFgV3flyzUHjCsO+pCgY35iukx4OSa9NjfBxMq9xzUoGQSagZVbcj1NSLR52YfKpLDrjMqI7ovNwh0jG/PlmmNv5F0AEgwMeP0qaupySeQ2qUZt2kVc4Y7A8t+mfAedQMsSOyNFgqcEHnQ7uaslUrJh30HE2B+6Wxmgyjugh8r1yd68bmNy3cxvsCM1E3UfVSD6VdFN/BAISQ2DgbjJrzE5AGcDn6V5ruEjATbw8Kml1BpGUK9KtQV2Tdw0Cclzyx/poRB3ONjTS3Vrq0kOB1qDy2p5a8Dyp3px+RW5ip5DxqUczI2pSQ3LINF1RZ7oLAeFEitZrlCbe2kkG3eA254G/Kl5Hixxe9objjkk/agSQXV0XkSKSVRzYLgZ/LrVpDwFIlEt/fxQKRkJGdZP6YokVhfpY9k9zHbQHvEFuZ28PhS1vecIs9Rkhe5kGCmtjoxjw9c+Nedz63Nkbx6fpfCv+51senxwqeXv7jEUvD470pZcPa9LABWkXIDdeW3L403LfxpItncXM+qPUotreIA77AZO308KoeJ+0dxNGqwaYEQ5QRbaaR4T/AHrjEatvcTNhCWx3jyyem+KzPQ5Gt2bj88satTBOoEr66ieJlw8rkkmSSQ7eGw61WuMHl50W7iMM0kZOcdfGk45dI0OCUPhzHmK34oJR9plyzblySJ571JEBI1NjOwFecrE2FGWB50IN3w7HrmmdC7FSaieVGljjXftCSRnGj+dRVY8KTnflnlTBR4KGQM45bDzFRYk4qTZyc7GoGhbsJJJHD7pPIAc6LxHa8kUEFQRj5CgspZQAfh40S9OqWNyCC0SHc5z3RvVpAtivWvVw716rALxGm2VFOc42WrOLhV7cwqQFAbOgmQanxzwOdPRcBvBJHJcRzaHIziNjkdeXKtO3sjw28tWNlJcAZympx3TtsQyjpXocynBbYW/9THiUW7kZS0tf2XKVudKzA50OcN9aO884JeAFS530aST8a2cfs/dtEsM0dvcxImmPVDGpjPiDk5HlyocHsPcAhkubKJWcu6Sxh2yfAgbDyrP+q1MFtX9hz0+CTt/3MZb2nEb2d0iKoqg7zyBFHoTgZrn7LvLMmW5ibsxydWDoT4alJHwzX02H2KtoZVupuJE6EOpUjCqevjj44rFrxy7XS0S6Fc6SjIGDjzGN6yvU5sjqVf6mnHp8ceYi6+06rALf7JGEAAzrOT9KK9xYXxUg9gdIGG67VC/i7OSK5hty1pcqWVCgZoyDgqTjptg+BpRUlj3WzEe+7FaVkwY54720/sw8WSayU3/oOyzCzCSvF2iuuFGaqPtQkuVKQRqSBzJarW7aQWMJ1Ekrjl5VRxySue9G6nQc4AFF9NzQWkSk+U3/AHK1eKT1Fr7BVHb3WWPefxGAOlMtw67SQZgkZc7sSNx0xUVhle8AiU6TgjAJxkcvhVjaT3VvbuGn055RSKNvQdB86c9VgSpumL/T5W7XRGK0bs9rSTI5HWuxo1twid1QSwwySnPKYr6bYNcuGedUUypFk+8seCcAnn+dPcHUqTNG8LgBgpCEYONt/CskdTulSlx+DQ8DStoLbez0c7dhJK9vGXIDp3icdf66VXXZFjxsQwuXFvsCeuBnNPXN5xSAxrFIo1HJMae6P41Srb3E008zwNr0EEEc8mt0tniV8GeG7m1XJf2s9vxONYe2uo7hIl1mVg8ZJ8Oo2NA41bPb8LVX3wAQVOQR0I8RVdAbu1md4lZC2AcRk5GBtVxcjt/YpQSEkt5FQagc4Ynb5jPxriavRxx5sc4/KOhhzOUZJmOkZcczzOdqjnrnmego7Q9pIF1ADtNJ28Qd/SoiJTAMJKXx7umu+si21ZyJwe+zxbSgJG2K0NlxThyy2pk4YIZASzzQSkc9vdOR9RzrOhZWl7MRvjO3c64p1reYhQIZjhR+A4rNkUM0dkn2NTljluSNTxBv7iLmCaOaJydDpkcuhHQ70G3lMttDIebICR8KnwCFrvgV7AImVk76o405Ixk8ttiahY9+0jJQpt7p6b14jWaaGHcou0nR6LBmc0rXaOBsmXybH0FUnFi1xwySHBBMgIHjg8qvihDSnpnP0FQslR4JQ0aOdZIVxn0rNhnslu/BoMtHw+7i4S9qIpAbhwzKV32930zTUdo9rbRQHVrQZIxyPUelaOaRY7q5GoLGQunA6Y5VLt4pNCRM8bd4KyK4O4Ixnz6+Net+mbk8k7XD8ujjfUJqSjCnzzwjPRSLJkAgsBnT1pi3zPDI8au3ZsE0hSSSf02ot1wm2a4hnLOpGBpKaQfn4U6l1DaQ6kkGITrKKQQRy3+ddbLmSXM4/wBHZy8eK3xGX9VRCK3uEeTtoGjVUyckDx/lSYvrdgBklvSirxiTirulurGInUrhSCvkSTj6Urb8IlN+UNzbRlV1d5+YJ2+nSsy1cU6bND0zcfahgXMRzsfUEb1yRlYOUicsVwN+eaWGmNE1FJRJlwY25DPIjpyz8RR45YmEQEbluzOMDGD6/GjyZ/anDkrDgTk93FAHdVDdkowBjGfh/XrXRclSAAwGojBOMYpcthG1EkdDgAZH/lVjJbcKMayHiTyAd7EMJYj+sUueeMV7hkccm+DlldJJcooD6tskkb86d42V+2RBvxRY+tJ28dhA0Zga5kf8LyQlc78icVa8Thgee2klSVnC4AQZB9a83qM6/Xxn9mdbDjrC4mULK6hQOeevhUrZPtE8cMUZeVyFCqNyTT0MNnbypq4bezaWIVgw7zeAGfpV/wAHtVguTNBwO6jlhSRlaYAZOgkDn1P51146yK5MOXA3wilnaw4Y5ghWOeZW0vLImpA3LCr1wc7nPp1pG6uZ51+9nLEgDDHAwOXlV0vDOIu0ev2TiKBgwJuV/hR5OE+0LuOx4bw6JNu68oJ/Kj/WQ6f9xXoPmmZIRStpCxk53BApjjFu8d7DIoJaW3jlYFeRK4xt6Vpr3hvH7O1Ry3CUZydoRIWGN+owai19dm1toxxmygkWH7xXRTuGIBwSMbDlQy1y3JpFLTPbTZjIrK8nBaC2mlU8yiE4qM1pdWoUzwTRBshS6kasc8Zq9fiL3Jdf9o0kJO8dtBlufIAZpW8nt7iOOC54hxeZlPchaEIRnw1Ac6ZDXO+Y8f1FvTKqT5KTD9fgR1ottGZlddR1c8KuTt1p6SPh0JETxzB8YxdXYhb4AbGq5bi3tX+0x3SMSSBACzEDz23Hxo8usuH8NNMvT6VKd5ehmHhd7dMVity2/PTgfP51YR8DiiVXv7uOLIyI0Gp8elJr7S3ckUSzR3uhyRiJ0hB36MwbI+ApOTjIWKdVgsYCWwQ0rSMf+Ad0+oFZJ59Zk4tR/HI5Y9NB8Kyxe/4bw+/Cww6lKYXtwHOrPhyH8qnLxu5lbCELjqcE/wAB8Ky95exXc+ZbjKgAqtvbhUDAbDBIIHifpVgbR1XLLjyFaNL9Px5XuzXJr5EZtZKHGPhB57oyszSTsx8WbJNIv2JJAlYn0zRHt9KAEAMTQQIlUh3bV00jauwsUca2wikjC8kpu5OwLMpU7khdycUO3uWt7yK4B70bq49Qc0e4eLQyRowGN8+NKQxGR+8dMecM+M4/jXN1MeTTiZf+0UWeI3UiBdKS/g5BHGtPocfCs0ThgPOtFxGbtobaRm0RS2wi1YyXMZxq+ijx2qi7OLCtqcnqMAD55rDgVRo1ZuXaJS/4r556j+dD2ySeQ3PpU2AdyVYZJ67UKdWSIgg7nc+FMS5AboXdi7lj1Ncb3E+Nc50fswqJr94fh/jRiqsigZ0yeY2BPXyoZ50RiWOc8vConv8A+r86AOiAzkY50e7AkWJs7mNQD022/SlnYDur8TTEuPslr46W/wDE1X0V3wJlSDg869Rcjrv4V6rsHaz61wj2zt4eFFOIvK10JCE7NeYIGCTkVOD2xsELpqcu2+rSrb+RDVk73g88MzMQWQnbT08qz80eid0ODg4r0Opxyxyvo5+HPHIqfJ9gtOI3V+pNpcDKjOJIcUx2nFB7xgJ8gw/WvkZmPD7e2a11RXDr2hnRyDjJGnHLoKIPaXjmsAcUuxtuO0osetjtqXYOTTvd7T629xxCW0e3LxR6xhpEZw2PLw9aBwz2dtxIUS/vIdbF2EcpILHnsfGvmC+0XHCf/Wt18ZDUh7T8bCFRxKcZBGrO+/gaRn/TZLk7sdhlmx8eDeTyWVxZcQtnvk0W14mHe6IOncEnfqQKRSxtJyRFxGybbIH21jv6cq+diR4+/wBo+se6ef1NOw8XuYbct+0ZFcbogUEE/KuLl02Pdds6MNRKujb2fC727soz9osASOfbDOOlcX2d4w04Ml/YCHWC2iYK2jqBgc6wqcVvipUXLafAgfwobXE7nvSFv9WMUMdFjj0H+rk+zcxey/FNZ7fiFtIpzgfa2JH7prrex1/PLl7mBQVxmOcvk9efh0rECR1chUglYKWJKA7DmaYTiVzGdrSzyAD3rZD+nnU/Sx7TLWpa7RrW9keLLlIpHmK7AmfJwefX1p6D2fu7KK0jlWZJJZWXaZse6SNgd9wKxkXHb5WYx2vD1PIkWkYP9bUKb2h4jPpYmIFWyoSBRv5Ac6GWmXyT9Tfg+gRezF52hdkvVUIB/jEZPUjB5VZ8N4NLwwTSNazzGRd2mcvpGPOvlR4/xI915myNiMYxXE4xes+O0mYsdh2rj8jV49Ntdt2inqE1XR9cLWbookgjGFAB7Nl+elq6Leyms3tSsJhkZWcK7jUR8T4188n9vONtEqyraEHkzRZO21Jf7YXzMjmCDSqkEAN3j0J73Tyrb6OjmrcaM/q54OrPpL+zfAH1H71CeWJ2On586Hb+zvAYHYy3FxIDyAmZMfI1gF9ubjG/DrE/GX/vrv8At1cD/wCrbHl4y/8AfVLBp18lPUZfsfTrTh/s1be5bl2P4pJnY/nTnFLOyvbCGKGCaNe0DFrQhHKjORqxyr5HH7dXcchb7DZPk5AbtMAeHv8A50K69spryczTWUOsjHduLhQPAACTFJy4Mb/wxkM8v5z6zZ8MNnHcrE84DxsEmuJcvy2UjGN+Wao4uFXdtEcRzyAE96RtTE+FfP7f2nn7ZFt42tizYZ4rqckofeXvuRgjyqD8f7GSSJraOTDHBF1cY59MSVzMv05ZG1J/c2Q1e2O5fg39vDcTtokt7nvHYraMoA8yxAzXLOxvWuLyKC1kkEcpHekCAEAep518+PtECMCyUDwF1c//AOlD/bkqOWEWNZLYFxN1/wCP896r/tWNE/XyNxxleK8Iskuns7WMM/ZHvazkjIO/oaztzx+V7fEl3cwzFVMaw91MZ3yRjpypj2fuIeKH+8rlkmXTrkdggAOfeJ57fKg2dpby2/GFu7bLJA32cuuCHEgxp88Z5dKqGPHjyODXQx5JSxqSZWiWzeNdcpeTG5Z25nnzq99nfZ+24tDcy9rBiPC6Hz168+VZS8s0ihaSMMrD8JNBt7x7eJ42jjYMfeeFWI9CeVbljjKNJ0ZXllF8m+tfZ/htpfXUU/ELWMoVKl20gZUE435b1cWy+zCQ9m/FOFSb7ZlT0zua+WLdSLKrwyyB2bYIADnlypheP8V0sou5yqDcHTsOXhQy0qly2Rahx4R9Ivrf2YdFUcUgiCA5NqFYvnzXqKBD/ss5cG/u2ck5dYJFONv8mOlfN5r6SVBNOszhiQD2wG4x4Dz+tS+1XaTC3ikuEcjl9qbG4z+VMjj2qk2A81u6PoNxfeydtchRDezlhyjXIPwbBp6X2l4fHAvZcM4g0Okq2uMLtjx1V8jMrzRvJJpk04yZGJO9BLKf92g+FU8EZd8k9eS6PpfDPbDh3ZRxnhsbSpEqM815GoOB4Nyqdx7fIlyrRWHDgycmaUuVHkUB+lYLhMUN1xNY5o9UWhmK6sclJ5/DNPcdThkMCfs6FYzsS3aMzZyQc5OPA0iWPCsijt5HQnklBzvg1N7/AGkXKxjsTw4k7jskkkI/5gtJzf2kcUeDC3gD/ux2YX6lj+VYLtdZ75+IqLBgAc5HiK0rFjXgzPLN+TXz+3XE5bXs/t9+X66jEo+aqGqvk9qb2W1MM012++SXv5GX/lqntrXt45HMiKIyM6juc56fCmI5bFQyvFGVKnGc6s4236b1Htj0i1ul26Oni0nZFOyt9R/Hhyw+bY+lCk4nOyKvaICpyGjhRG/5gAaRGWIHMmusCGKkbg4NFSF7mMz8Su7nT291cS6fd1yE4oSSyNLrBLEfvEmhKrO4VRkk4ApiZDbL9nyO0/3m/LyqnXRcb/cMPdSXKAao0VD7znOfhS73OmMokshJ5kHAPwoIEYOWbUfKmFlssjMTjzG/0JoVGukG57uWKli3Mk48TXVB5AE+gqSy6GLRjGf3t6MZZYlKG4YK4yFT6ZHSmCgRhkVdbRsFzzIrTxWTyxrJPc6Y2A3G55eFZd3YjHaMw8ya08cpksoFx+AYwfKujoVe5Mzah9USEMMeC8hyD0UfrQJew5rqznYnx9K4IyznCnGc5NckwoPaYJPXwrZLqhK+RcxxHOpwQfDnQmfVhQMKPdUdKkzJnkfU9KgVUZIkjIB6kgmuZq1bW02ad0nZx5GZFRmJVM6QTyycnHxoBO9EKtkDG55AdaEwIYgjG/WsDi1wabsnHjtVzsAcnPlSpdgxZSVJJOxo+e6+OZXAHrSpyWwASfAVEgZBY5SWIIXUR3TjcGonf1rwi0nLnB8Bz/lUpCGIcbavzqmSIMmoSNpAA6jnU22qJGpSDy8fA1ESQDNNEZ4fCxP43X8j+tKkaTg04MnhUZxgLM4LE9SFx+RomLTpi+/TFeqPaKOma9UphWfXbWKS5mZpFwo8ayfH+ELbX7yQqDE240jkeordSsI4WOceGKorxWmYdqmlF579K9vqYqS2s8vgyuMrRjHDSRpG+6oMKD0qHYKW1bg8qvp+Fs69rGmASQB1NVjxOrHVnxrj5dK4vhHXxZ4zXYt2Z239PlUNJ8aaWRolcDHfUqcjO1B+lZnBmi0BaLUACetGcxtbxp9nQOme+D72/Wuu6GNFCYZc5bPvZxj0x+tRNJcL7QalXQFVZCcCj25iFxEblGaEODIF5lc74rsjI2nQmgad985Pj/XhXEaMBtYJ7vdwetC48Frhhr42T3EkllbvEpHLGOvr4UIyDWQqNgvsDuQBUVK6XB6gfnRA6Aqw2OvJpe1RVIJyb5O2gtp58X0rRRlWOpVJJboNqFOLZLkC2aRoQ2rLnc1EgYXfkN/nXiBnAO2kn+VDsV2XudUDZ8k53/WpW667qMC47Df/ABCcBaicE1FhgnfNFS6AT8npi3auvbdqqkhWznIoLZ0Aii6ckbV5lAOMDaolSojduwXTrXD6GiaQxxiuOmlyvWrKoh15Vw+ld0ZOKlJC0ZAbqMjfpUIQ614bGugVJo2RQ3Q8sGhfJZ7JxyNdzvyPLwqG/ifnXQhKkgnHXepRdhCHUA6W35V4u5xs1CGccz867gsQATk+dVRNx0626NXNLk8jXGGk4ORjzqO1RIl/IxEsgljIUkqdX1qa285EmIidQ6EeOaBDEXkXCggsM71xYwRLsDpGfqB+tU0XYeW3uI4ER49IBY7kdcfwrqtm9Vyy6RjJ1D93FKlMQq2kbkj8qK0OOzkVlIbA58j51EiWRVdEDqSuW0438KFp25ipBDiQZA0jJ+Bx+tDq6SKYaFkWTLyFVwd13Ocbda9IyNkdqxzzyvWuS25SFZNanUcY68gf1oGKqk+SW1wS7g5kmuh1Q5XVnrvQ+VTfs9I051bZOfKqolj4tGPDu2jhy8p91ei0r9mnwMwhceO1FSdpuHGHUdcPeGDzX+VJFiTuTQRT8hyaGUjkjkDN2ZwckFhR5khuYtURKTA4MYOQ3mKTacNbiIruBgHPnmhBipyD8ajVlqaXAeOAFiqyfefhGOZ8KAc5yedTkleRgzHJAxmu60k984bHvePr/Gr58g8PoHXhU2iK47ykMTghv6x8aJ2CRk9tIox+GMhifiNqloqiMSAhpJM9mvT94+H9dKGzM7Fm5k5okknaYXTpRdlUdP5+dQHPFWr7I66OqK2vDZBJwC3jWGJXC/4unLHc1i1G+K1vA0d7WKN5NEecZB5Vv0TalXyZdR+2/gYWzkeMkkN1IApK64ZMi9o00Z64zg1qDDEVKW0j6zjpnJpW44HOVzJIAB03rrPAtvyzEsvPJkHiCAguTt0pJjgedae8sIY9WnGcYPrWdkt5A5DAJ3sZY4+nOuXqsTg0bsEtyICPtJMn3QMt6U1auJGlBBI5gDkBQdPZxDDatWxwOWOlT4ecXTA8itYU/eamuAzOjM6LG2peeWxzqtZsMQqhc88fxp9kCTiTo5waSuFKzuPOs0+GMjygNeB/D4/nXifGudQfA1RZBnUbDfzoTMx5nIqbg6mwM71Ag+BokLbZ0YZd+Y5edPLCjezc9wca1vY0HPkY3P5gUigyS3QU7FcOvBLyzwpjaWKbJbBBGV5ddmNU/sCytNerxA5mvURKPuTojKQd886Ra0MsmGBI8Mc6sdBYd3aiIrKBnGa+gSimeQUmKmwUKrAEsOQHSqni1lZJFJcTq8SoMsUHOtOgJGetZf25j08IRxnvTAH5Gk5JqON2huJOWRU6KWOw4bfQ67biDmTHuNEAR/1fpQm9n1AJPEYV8FMUmfotZzWyEMrEMORBxWqS/Y2kZe2nbOPvCdiMfxB9a5K2ZE2+KO3zBpdiZ9n5t9F7ZsP88uj8xQ/2DeEkJNZSHlhLlSavoYopgCsoU/5+VHl4XrGNAO2xG4NA9LKSuPIxZccXUuDLtwDioO9kfXtEx/4qHJwXikQy1hOR4oA//hzV7Nwloxns/pSywyRMNJKehxWaWGa7Q+LhLqRT/sziPTh14f8A2d/4UCaKW3P38UkX/wCYpX861si3DQf4zEf6jQYp7+JSsd5KvkJDSJRkvA1Y0+mZPtFxsRj1rhYeIrVPxTiStvfXAI23kNdW/vLgESSiUeEqK+fmDSm/sX6P3Ml8K5Wqe6kjG9tZjP8A+Di/7a4LxCMPaWTeObVB+QFDdeC/QfyZfpk1E+Fah5rJhk8JsD/wuPyYVENYZyeFWB8tMn/fVb/sT0JfJmBXDuTWsL8JZcNwW1z+8kki/wDxGl3g4O524bIv+m8b/tqvUXwT0JGayR8K6WJO5JrRfY+EE7WEw/8AbG/7a79l4Sp24ZIw/wD1jZ/8NV6kS/QmZnOK6XLY35VpBa8DK96yvEP+S5Bx81qP7O4I/IcSG/70Z/Sr9SIPoTM3UtbBdOdvCtD+yuEE7PxEf/xfwro4TwpiRr4j84v4VN8SLBk+DN9K8CRuOdaccG4Oe72vEgfSM1L9g8IIz9rv19YEP61XqQL9DJ3RlixZiWOTXMeFadvZ/hnJOJz58Gtf/mrg9m7Nvd4o5HXNof8Avpi2vhAelk+DNq7Ly5ZzXgzd4j8QINaQ+zVuo/8AWX/9U/8AfQz7P2mSBxM/+6H/AL6PavJWyfwZ8k6cdOdeLNtljty8qvjwG0zvxJseVr/89c/YdmOfE2/90P8A31XtRNk/goMnJ33POuEYrRLwLh5XvcUlz5WZ/wC+iDgPCs78Ruj/AKbQD/4qHjwT05GX3rhFascD4IOdzxJvSKNfzzQn4RwcA4biZPrH/Cpt+xNkjMda4RWk/ZPC+rcRA/8A2/4VH9n8IDkdnfsPN0H5CgL9ORnlYqwI2IrznUxbGM+FaP7JwlVObCdt+ZuiPyWorDwpCT+zHbya7Yj8qByQSxTM5jNeIrTu1iRiPg1in+oyN9dYr0Nxbw+7wvh+r/NEzfmxoHNB+hIzA5V7bqRWt+3am1G1sgfAWcWB/wBNNrxW+ZNMdwYlP4YgEH/SBSpZq8DI6RvyY2C0uLra3t5ZiP8A7OMv+Qp+H2b4zPCZU4Zc9mObMmgf9WK1kV9fFCkl3OU/dLnBo/2tOzxMSxHIHekT1cl0jRHQp9yMwnsbxcxh2S2j1clkuUDfIE04fYa8jiVpb20R2/ACzkf8oxV2OLSwowjATNKNdyySmVmJJO+TS1qcz+ENWiwryxdvY22tLcS3HFJC4xqENqSFHjlmXNesGt7aFYYpncBiSZEC8/IE1684jI0ZiDNpPQnanfZ6xtb23m7WFXcOMEkjAx5Gux9IWXLkqTOX9Vjhw4bSGoLwKdSRqc9c1ye9lmzkEkee1XdrwO2BAW3jz5gt+dWaezcMiZMMJHgEAr1LxbVTZ5Gf1HFBmAubllXSYFPm5xis3Oe+dutfYDweKLK9hEBzI0isb7S+yjQK13ZAmP8AFHvkelYdbpJzjcXZu0H1XDKex8WY4ZZWX4ipWJxcMeujagvkZxRLVj23/Cdq4ShUqZ3nK1wOSxlrdxkgjcfCq65cSMH5bDO1WinCEVVXa6WO2FIyBWWXLG9IXZ1Hiaj2mTsB8agc71wVaQLZoFtEkiUmOFjjmGxQXs1TJKwx48WJpiCNBYw6hnuClIEjkMrNGNzkA74FP1MFGqBxO1yVcmlXZVOQDzFN2kRl4ZxNggJiSNs77DWB/WaSYHUdjzqx4Ww+y8UjbA12jadXVgykY8+dIjyXIqCd69XTE5O6mvVdg0feyoQkeNdC9dgKII9ecZGOVeWMk7nave2eNfDO4xuATVT7QcOfifBpbeMDtQQ6DzHT8xVyo6VMRgHNLlTTTChlcZJo+Jy2k8U5hkhdZc40MuDWqgjzBG8k66+yVTEQc5G3psK3d4FKHPvc6p3EckmGVSc9RSMei9rSfZv/AF/uTcejOrqQ7EfCiC/lgZdMxx+7zFXM0Fuw70agAdBiqi5W1TJ0AKBgHNIjpp4ZWpG2Wsx5o7XEu4eLiJkjnhSVWAbwO9Nztw+4j1yWAK5HeXGaz7KjRxyOHPcADIeVPWbMyBYbwEY3GBkfCuioqXaOLOKj7oumK3wslbEB0AbgNmqxpUV9WRitLd2YuYbdB2avHq1Pv3wcYB36HPzqpk4I7HOYFHiJD/CkZMLfUTbg1SS90isdoJG5HPmaIlsugkKfUUw/AjokkWcBYxqcnkB41yHhczjTDe27Z/CHxWSWlb/lN0dbFc7hGcYUIGJoZhUjwpm44fxCF8PbyE4zkKSMUsXkPr4Vmlp0vBqhqlPlSPdiufKp/ZwfxA0LVKCNqj2smc4NJeOK8D1lfyEa1wDyI8qH2OGyAaiZ3zmuds2KW4Y34DWSXyH7A9dqkkYBI1DNLiVseFSSbptQPHD4DWSXyMGEMSCR4iudio8PlzqAm6ZNSE3id6B44LwMU2/J0BAd96npjxsd/DFDLrzx8q8GTJ2pbgvgNT+4ZZRFjSgJ86k11nGVGPHFB7Reo2oqSR4wQRQei30gll8WEVlYHCAV0OwGwYHkMGppcRKOf0qfbwtsevXFGoTXRfqQA4ndMMWA8K59mkO4xvvpNOqYDzfAHlTKfYsAtN15Ab1Hjm+yvUiVJsmO5Q55iofYwXycHwFXDywKcLICvmOdchSOU4B688U3FpnIVkzxihGOyB2APpTsXCM40gk53zVhBCNajc9PWriG3RVGrbPiK6uLRpLk5OfXxT7M6/CI1GRkkdG/86RmsYwx2Xx3H8603EYtUBVCAeXrWXuEaL4Gmz08IrlC8epc+mKTQIg3HPoKrZAAx7oGfCnppG5b4ApVg5HLAFcvU44+EdHDN+RVmPhtQSQd8Zpl4j18aHjoAM1y5Qo1qQEFtsDFdGdVTbpla5uOQpbiHuOjrvj1oinHXehaTjlvXAMvg9eVDKFhKdD6TyqpAY/OovO+CcHypYsQMCotIeVJeJDfVdBe2Znxn4VNZiGyRsOeaVMnzrhZmzvV7CvVJ3MmWGOQ8K0PskxZ7kByBhdsDzrNGMlts71e8Ga44dbGYINMxxuPCux9Kax5VJ9I5P1W8mFxXbN5Grkf4rD02q0tGwQPtU4HlIaw0fGbtCBmL0xRRx28/C6IemFr0kskMnR4zN9PzPpo3k3D4rgFmkkfP77Zqmn4TGpZXBK/uk7VRxe0XFU2HE9I8OzU/mKTu+LXtxIXk4pKxI6AAfSqhvj2+DLj+nahOnP+4r7T+x2Ua84cne5tEo/KsHEWiuNL5UjIIPOtlLe3sgKniE5Xw1mqbiPDu2XtkOX6+Jrma7Ape+C5PUfT5ZccdmaVi+sAZDAjFJ3LI8Q8RQGLoxU5B6iuGN9ySK86407O3utcHmaBolUW6qw5sGbJ+Zx9KgJFQOixxnUMEsoJHp4V4rvz+lc7MgE4Pyok0ga4LwHFrGv+WlrUYjYbZ1c8Y/rwqWptKgHGFyM1GGQiDvbgtkb5rXrFyl9heB8FbO2id16A1xGBVj4Dau3i/wB5c+O9RTZMViilQyTYNiScgCvVzIGxGa9RJIrk/QAYacVAuqtjrVTNeSopwR0qFq73jr2kjAHIwu31517xQPITjxZddsi7s4A8zQ5OIW+lgr69PMJufpVdJawhsMgfAxl+9n50YDLb1fprszbooBe3Fx2LdhbuWPViBmqWG34xJKTiOPPLrWpjiViAcnNWZiis+HS3SRq0iEAa9xuaCc1DkXl17hSUVyY8cA4pcIXd3ZBz7wUflVLc8OKymIIJcfiRtS/OtVPeXF/Gr3MrOCMhBso+A2qKwoEDYyfOjWLcrkNx6rJBXIqYoXW2iQg7LggGui3lZxhFwP8ANViFB1ZHWuI+GOAPlTnBVRIZm5C/ZzqAA3/VmuLFcvLp0ZHTBprWx5mrnhVvH2LXRy0i+7k7DzrPOKjG2Py6l443RWW3CrieG5iZCmuIqdYxv/Qo9hwWO2x2Vo0s3WRyDj0HStBbgNcRgj3jg1bJEiZ0qBvWSeba+jj676hkUUvkz8PDrgtqkhkweYWUCm+wtO6p4QrlerlDT7uSaIqgAtjcUqWRy7OQ9XPz/uUp4Hw9xIX4NFpbmAy/0Kz95wvgra4rXhskkg21Gc6FPqOdXV1PJdcSubR2KwRfhTbVzHePWiW8SOQpGFGwA5U2EVW6XJ0cWoy4lucn/m/+TGReyvagLoJbqQ5/hRT7DyL3mnCL5qTX0mKJIozoUCkOISsqso5UO6E5UooOP1zVynUZHzyT2TiTObz07lDHs1bj3rt/+FBWluDljSbeg5E/IE/pWtaTC1bidTF9T1TSuRSH2bjZwkN2WfoDF/OvH2UvdWFkib/iIrUQQpDEukbuAWY8zV3w63iPeK5wORrPk0+CKvaSf1rU475uj5+vsbxqT/Dtw3mHUD6moP7L8UtiRNZsCPB1P5Gvq8ihEOkAYqiuWJk59cUjFhhJ9cAaf/qDVZnTo+etwy8G32dxjwU0M8LuFGWRx6it1Mo1kdNqq7vvzCI+4Rkgda1fpsdXR1Ya/LIzSWElOw8JL4yadc5Y9MeFFjJyDnc0cMGO+USWsyNcMY4f7OwSkB3bfwFPXPAOFw27EIXdfEkEUtEzBxhmG3Q4q+4bAsswV2cjGd2qsmKMPd4OZn1meLvczCXFn2chMa4GdhmuRSTROOVfReKW9skAZrWFz/mT+GKwXGLgC7CwwQwKB7sakA+uTSVKEulRp0X1V6mWyhmLicikfdAY32pj9vSsNJhxnyrOm6fJ2Xnijo7NGpJxkchTdzNrhFu2iwm4nIc4OKTmmeYEkqPHahZxgAD5VE4B5Dfypcrl2x0JKPSICMEhVbW5OwUZz8KBKqqSjoVcc1IIPyqxsiBxCDSoBL5yKd4iqzXA7RQxVQVY8xvSnpd8bTGLW7JqNGaaDUe6hPwoRt3yT2bfLlW0s4kDBQNsVYXHDbd41JB3pcvpcfLLf1dqVbT5m8Tb5Wh6PI5ra3nDbZS3dJ3AyTVXLZwKGIj5AY3rPP6Yl5NkPqG7wZ5gdsA0Mlg2CNqt54kVQQopVwuM6RWWeiUfJojqb8Fe742B3NDwxO2NqZkRdWMVzQATjPPFYcmLaaYzsD2Zz+tEit5GcKqkk9BVzw3h8E5Bk1HyzirCNUiHZxoqL1wNz8aywi5T2Lse1thvfRV2vDWU/ekKevp5Vbm6jaExuiFCMBSMYFCOGJ2FQdQOVej0un9CDSfL7OBqtR60k2uF0JNIYzpONuR8RUTcA8jtR7mNTBr/ABLuKRlQI5Ucs0ucpY5ONlxjGUd1E2mKn3qEZ8czk+NRIByag6gYIpcs0q7DWNWeMu/PfwqJnbUADzNRNRPMUMcsn5CcEiE9n9qy42fxFKvG2fw6hzzVijEVX8T7sjFdj4ikarDFR3oZhm72s4kMzHbsR65o8tqRaSdpOhOnICDb5mqeN5DFq7RgfI052Km0kkJYsMbk5rlbXuRsUlQxLtbsT4YoMWBbrjr5US4P91Y/ChKx7GPzArpa396RnwL22KXY++B6YoQ2+NHu+aHyNLj3c1giNl2QY4Y7V6unY16iIf/Z"

/***/ }),

/***/ 151:
/*!**********************************************!*\
  !*** E:/3.0/MaWeiTravel/static/tab/轮播图3.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 152:
/*!**********************************************!*\
  !*** E:/3.0/MaWeiTravel/static/tab/轮播图4.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/tab/轮播图4.jpg";

/***/ }),

/***/ 153:
/*!**********************************************!*\
  !*** E:/3.0/MaWeiTravel/static/tab/轮播图5.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/tab/轮播图5.jpg";

/***/ }),

/***/ 19:
/*!**********************************************!*\
  !*** E:/3.0/MaWeiTravel/common/cloundfun.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.homelist = exports.home = void 0; // promise  封装
var db = wx.cloud.database(); //指定要操作数据库

// 请求tab数据
var home = function home(tab) {
  return new Promise(function (resolve, reject) {
    var tabs = db.collection(tab);
    tabs.get().
    then(function (res) {
      console.log('数据是否请求');
      resolve(res);
    }).
    catch(function (err) {
      reject(err);
    });
  });
};

// 请求攻略列表的数据  微信小程序每次请求limit最大为20  需要自定义
exports.home = home;var homelist = function homelist(listing, pageid) {
  return new Promise(function (resolve, reject) {
    var listdata = db.collection(listing).
    limit(20).
    skip(pageid * 6);
    listdata.get().
    then(function (res) {
      resolve(res);
    }).
    catch(function (err) {
      reject(err);
    });
  });
};

//模块化导出
exports.homelist = homelist;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"MaWeiTravel","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"MaWeiTravel","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"MaWeiTravel","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"MaWeiTravel","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 28:
/*!*****************************************!*\
  !*** E:/3.0/MaWeiTravel/common/list.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.preview = exports.login = exports.addressdata = void 0; //公用方法集合

var QQMapWX = __webpack_require__(/*! ../common/qqmap-wx-jssdk.js */ 29);
var qqmapsdk;

// 定位
var addressdata = function addressdata() {
  return new Promise(function (resolve, reject) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'M5IBZ-FPCHS-NM6OI-6CY27-IN2J7-H7FJG' });

    qqmapsdk.reverseGeocoder({
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      } });

  });
};


// 公用预览图片
exports.addressdata = addressdata;var preview = function preview(index, imglist) {
  return new Promise(function (resolve, reject) {
    uni.previewImage({
      current: index,
      urls: imglist,
      longPressActions: {
        itemList: ['发送给朋友', '保存图片', '收藏'] } }).


    then(function (res) {
      resolve(res);
    }).
    catch(function (err) {
      reject(err);
    });
  });
};

//公用存储用户登录数据
exports.preview = preview;var login = function login(user) {
  return new Promise(function (resolve, reject) {
    var db = wx.cloud.database();
    var users = db.collection('user');
    users.add({
      data: user }).

    then(function (res) {
      resolve(res);
    }).
    catch(function (err) {
      reject(err);
    });
  });
};


//导出外部
exports.login = login;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 29:
/*!***************************************************!*\
  !*** E:/3.0/MaWeiTravel/common/qqmap-wx-jssdk.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 微信小程序JavaScriptSDK
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @version 1.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @date 2019-03-06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var ERROR_CONF = {
  KEY_ERR: 311,
  KEY_ERR_MSG: 'key格式错误',
  PARAM_ERR: 310,
  PARAM_ERR_MSG: '请求参数信息有误',
  SYSTEM_ERR: 600,
  SYSTEM_ERR_MSG: '系统错误',
  WX_ERR_CODE: 1000,
  WX_OK_CODE: 200 };

var BASE_URL = 'https://apis.map.qq.com/ws/';
var URL_SEARCH = BASE_URL + 'place/v1/search';
var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';
var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';
var URL_CITY_LIST = BASE_URL + 'district/v1/list';
var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';
var URL_DISTANCE = BASE_URL + 'distance/v1/';
var URL_DIRECTION = BASE_URL + 'direction/v1/';
var MODE = {
  driving: 'driving',
  transit: 'transit' };

var EARTH_RADIUS = 6378136.49;
var Utils = {
  /**
              * md5加密方法
              * 版权所有©2011 Sebastian Tschan，https：//blueimp.net
              */
  safeAdd: function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
  },
  bitRotateLeft: function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  },
  md5cmn: function md5cmn(q, a, b, x, s, t) {
    return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);
  },
  md5ff: function md5ff(a, b, c, d, x, s, t) {
    return this.md5cmn(b & c | ~b & d, a, b, x, s, t);
  },
  md5gg: function md5gg(a, b, c, d, x, s, t) {
    return this.md5cmn(b & d | c & ~d, a, b, x, s, t);
  },
  md5hh: function md5hh(a, b, c, d, x, s, t) {
    return this.md5cmn(b ^ c ^ d, a, b, x, s, t);
  },
  md5ii: function md5ii(a, b, c, d, x, s, t) {
    return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);
  },
  binlMD5: function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;

    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = this.md5ff(a, b, c, d, x[i], 7, -680876936);
      d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = this.md5gg(b, c, d, a, x[i], 20, -373897302);
      a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = this.md5hh(d, a, b, c, x[i], 11, -358537222);
      c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = this.md5ii(a, b, c, d, x[i], 6, -198630844);
      d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = this.safeAdd(a, olda);
      b = this.safeAdd(b, oldb);
      c = this.safeAdd(c, oldc);
      d = this.safeAdd(d, oldd);
    }
    return [a, b, c, d];
  },
  binl2rstr: function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
    }
    return output;
  },
  rstr2binl: function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
  },
  rstrMD5: function rstrMD5(s) {
    return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));
  },
  rstrHMACMD5: function rstrHMACMD5(key, data) {
    var i;
    var bkey = this.rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = this.binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
    return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));
  },
  rstr2hex: function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  },
  str2rstrUTF8: function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
  },
  rawMD5: function rawMD5(s) {
    return this.rstrMD5(this.str2rstrUTF8(s));
  },
  hexMD5: function hexMD5(s) {
    return this.rstr2hex(this.rawMD5(s));
  },
  rawHMACMD5: function rawHMACMD5(k, d) {
    return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));
  },
  hexHMACMD5: function hexHMACMD5(k, d) {
    return this.rstr2hex(this.rawHMACMD5(k, d));
  },

  md5: function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return this.hexMD5(string);
      }
      return this.rawMD5(string);
    }
    if (!raw) {
      return this.hexHMACMD5(key, string);
    }
    return this.rawHMACMD5(key, string);
  },
  /**
      * 得到md5加密后的sig参数
      * @param {Object} requestParam 接口参数
      * @param {String} sk签名字符串
      * @param {String} featrue 方法名
      * @return 返回加密后的sig参数
      */
  getSig: function getSig(requestParam, sk, feature, mode) {
    var sig = null;
    var requestArr = [];
    Object.keys(requestParam).sort().forEach(function (key) {
      requestArr.push(key + '=' + requestParam[key]);
    });
    if (feature == 'search') {
      sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;
    }
    if (feature == 'suggest') {
      sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;
    }
    if (feature == 'reverseGeocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'geocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'getCityList') {
      sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;
    }
    if (feature == 'getDistrictByCityId') {
      sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;
    }
    if (feature == 'calculateDistance') {
      sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'direction') {
      sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;
    }
    sig = this.md5(sig);
    return sig;
  },
  /**
      * 得到终点query字符串
      * @param {Array|String} 检索数据
      */
  location2query: function location2query(data) {
    if (typeof data == 'string') {
      return data;
    }
    var query = '';
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      if (!!query) {
        query += ';';
      }
      if (d.location) {
        query = query + d.location.lat + ',' + d.location.lng;
      }
      if (d.latitude && d.longitude) {
        query = query + d.latitude + ',' + d.longitude;
      }
    }
    return query;
  },

  /**
      * 计算角度
      */
  rad: function rad(d) {
    return d * Math.PI / 180.0;
  },
  /**
      * 处理终点location数组
      * @return 返回终点数组
      */
  getEndLocation: function getEndLocation(location) {
    var to = location.split(';');
    var endLocation = [];
    for (var i = 0; i < to.length; i++) {
      endLocation.push({
        lat: parseFloat(to[i].split(',')[0]),
        lng: parseFloat(to[i].split(',')[1]) });

    }
    return endLocation;
  },

  /**
      * 计算两点间直线距离
      * @param a 表示纬度差
      * @param b 表示经度差
      * @return 返回的是距离，单位m
      */
  getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {
    var radLatFrom = this.rad(latFrom);
    var radLatTo = this.rad(latTo);
    var a = radLatFrom - radLatTo;
    var b = this.rad(lngFrom) - this.rad(lngTo);
    var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
    distance = distance * EARTH_RADIUS;
    distance = Math.round(distance * 10000) / 10000;
    return parseFloat(distance.toFixed(0));
  },
  /**
      * 使用微信接口进行定位
      */
  getWXLocation: function getWXLocation(success, fail, complete) {
    wx.getLocation({
      type: 'gcj02',
      success: success,
      fail: fail,
      complete: complete });

  },

  /**
      * 获取location参数
      */
  getLocationParam: function getLocationParam(location) {
    if (typeof location == 'string') {
      var locationArr = location.split(',');
      if (locationArr.length === 2) {
        location = {
          latitude: location.split(',')[0],
          longitude: location.split(',')[1] };

      } else {
        location = {};
      }
    }
    return location;
  },

  /**
      * 回调函数默认处理
      */
  polyfillParam: function polyfillParam(param) {
    param.success = param.success || function () {};
    param.fail = param.fail || function () {};
    param.complete = param.complete || function () {};
  },

  /**
      * 验证param对应的key值是否为空
      * 
      * @param {Object} param 接口参数
      * @param {String} key 对应参数的key
      */
  checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {
    if (!param[key]) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return true;
    }
    return false;
  },

  /**
      * 验证参数中是否存在检索词keyword
      * 
      * @param {Object} param 接口参数
      */
  checkKeyword: function checkKeyword(param) {
    return !this.checkParamKeyEmpty(param, 'keyword');
  },

  /**
      * 验证location值
      * 
      * @param {Object} param 接口参数
      */
  checkLocation: function checkLocation(param) {
    var location = this.getLocationParam(param.location);
    if (!location || !location.latitude || !location.longitude) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return false;
    }
    return true;
  },

  /**
      * 构造错误数据结构
      * @param {Number} errCode 错误码
      * @param {Number} errMsg 错误描述
      */
  buildErrorConfig: function buildErrorConfig(errCode, errMsg) {
    return {
      status: errCode,
      message: errMsg };

  },

  /**
      * 
      * 数据处理函数
      * 根据传入参数不同处理不同数据
      * @param {String} feature 功能名称
      * search 地点搜索
      * suggest关键词提示
      * reverseGeocoder逆地址解析
      * geocoder地址解析
      * getCityList获取城市列表：父集
      * getDistrictByCityId获取区县列表：子集
      * calculateDistance距离计算
      * @param {Object} param 接口参数
      * @param {Object} data 数据
      */
  handleData: function handleData(param, data, feature) {
    if (feature == 'search') {
      var searchResult = data.data;
      var searchSimplify = [];
      for (var i = 0; i < searchResult.length; i++) {
        searchSimplify.push({
          id: searchResult[i].id || null,
          title: searchResult[i].title || null,
          latitude: searchResult[i].location && searchResult[i].location.lat || null,
          longitude: searchResult[i].location && searchResult[i].location.lng || null,
          address: searchResult[i].address || null,
          category: searchResult[i].category || null,
          tel: searchResult[i].tel || null,
          adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null,
          city: searchResult[i].ad_info && searchResult[i].ad_info.city || null,
          district: searchResult[i].ad_info && searchResult[i].ad_info.district || null,
          province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });

      }
      param.success(data, {
        searchResult: searchResult,
        searchSimplify: searchSimplify });

    } else if (feature == 'suggest') {
      var suggestResult = data.data;
      var suggestSimplify = [];
      for (var i = 0; i < suggestResult.length; i++) {
        suggestSimplify.push({
          adcode: suggestResult[i].adcode || null,
          address: suggestResult[i].address || null,
          category: suggestResult[i].category || null,
          city: suggestResult[i].city || null,
          district: suggestResult[i].district || null,
          id: suggestResult[i].id || null,
          latitude: suggestResult[i].location && suggestResult[i].location.lat || null,
          longitude: suggestResult[i].location && suggestResult[i].location.lng || null,
          province: suggestResult[i].province || null,
          title: suggestResult[i].title || null,
          type: suggestResult[i].type || null });

      }
      param.success(data, {
        suggestResult: suggestResult,
        suggestSimplify: suggestSimplify });

    } else if (feature == 'reverseGeocoder') {
      var reverseGeocoderResult = data.result;
      var reverseGeocoderSimplify = {
        address: reverseGeocoderResult.address || null,
        latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null,
        longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null,
        adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null,
        city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null,
        district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null,
        nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null,
        province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null,
        street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null,
        street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null,
        recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null,
        rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };

      if (reverseGeocoderResult.pois) {//判断是否返回周边poi
        var pois = reverseGeocoderResult.pois;
        var poisSimplify = [];
        for (var i = 0; i < pois.length; i++) {
          poisSimplify.push({
            id: pois[i].id || null,
            title: pois[i].title || null,
            latitude: pois[i].location && pois[i].location.lat || null,
            longitude: pois[i].location && pois[i].location.lng || null,
            address: pois[i].address || null,
            category: pois[i].category || null,
            adcode: pois[i].ad_info && pois[i].ad_info.adcode || null,
            city: pois[i].ad_info && pois[i].ad_info.city || null,
            district: pois[i].ad_info && pois[i].ad_info.district || null,
            province: pois[i].ad_info && pois[i].ad_info.province || null });

        }
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify,
          pois: pois,
          poisSimplify: poisSimplify });

      } else {
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify });

      }
    } else if (feature == 'geocoder') {
      var geocoderResult = data.result;
      var geocoderSimplify = {
        title: geocoderResult.title || null,
        latitude: geocoderResult.location && geocoderResult.location.lat || null,
        longitude: geocoderResult.location && geocoderResult.location.lng || null,
        adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null,
        province: geocoderResult.address_components && geocoderResult.address_components.province || null,
        city: geocoderResult.address_components && geocoderResult.address_components.city || null,
        district: geocoderResult.address_components && geocoderResult.address_components.district || null,
        street: geocoderResult.address_components && geocoderResult.address_components.street || null,
        street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null,
        level: geocoderResult.level || null };

      param.success(data, {
        geocoderResult: geocoderResult,
        geocoderSimplify: geocoderSimplify });

    } else if (feature == 'getCityList') {
      var provinceResult = data.result[0];
      var cityResult = data.result[1];
      var districtResult = data.result[2];
      param.success(data, {
        provinceResult: provinceResult,
        cityResult: cityResult,
        districtResult: districtResult });

    } else if (feature == 'getDistrictByCityId') {
      var districtByCity = data.result[0];
      param.success(data, districtByCity);
    } else if (feature == 'calculateDistance') {
      var calculateDistanceResult = data.result.elements;
      var distance = [];
      for (var i = 0; i < calculateDistanceResult.length; i++) {
        distance.push(calculateDistanceResult[i].distance);
      }
      param.success(data, {
        calculateDistanceResult: calculateDistanceResult,
        distance: distance });

    } else if (feature == 'direction') {
      var direction = data.result.routes;
      param.success(data, direction);
    } else {
      param.success(data);
    }
  },

  /**
      * 构造微信请求参数，公共属性处理
      * 
      * @param {Object} param 接口参数
      * @param {Object} param 配置项
      * @param {String} feature 方法名
      */
  buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {
    var that = this;
    options.header = { "content-type": "application/json" };
    options.method = 'GET';
    options.success = function (res) {
      var data = res.data;
      if (data.status === 0) {
        that.handleData(param, data, feature);
      } else {
        param.fail(data);
      }
    };
    options.fail = function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    options.complete = function (res) {
      var statusCode = +res.statusCode;
      switch (statusCode) {
        case ERROR_CONF.WX_ERR_CODE:{
            param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
            break;
          }
        case ERROR_CONF.WX_OK_CODE:{
            var data = res.data;
            if (data.status === 0) {
              param.complete(data);
            } else {
              param.complete(that.buildErrorConfig(data.status, data.message));
            }
            break;
          }
        default:{
            param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));
          }}


    };
    return options;
  },

  /**
      * 处理用户参数是否传入坐标进行不同的处理
      */
  locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {
    var that = this;
    locationfail = locationfail || function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    locationcomplete = locationcomplete || function (res) {
      if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {
        param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
      }
    };
    if (!param.location) {
      that.getWXLocation(locationsuccess, locationfail, locationcomplete);
    } else if (that.checkLocation(param)) {
      var location = Utils.getLocationParam(param.location);
      locationsuccess(location);
    }
  } };var



QQMapWX = /*#__PURE__*/function () {"use strict";

  /**
                                                   * 构造函数
                                                   * 
                                                   * @param {Object} options 接口参数,key 为必选参数
                                                   */
  function QQMapWX(options) {_classCallCheck(this, QQMapWX);
    if (!options.key) {
      throw Error('key值不能为空');
    }
    this.key = options.key;
  }_createClass(QQMapWX, [{ key: "search",

    /**
                                            * POI周边检索
                                            *
                                            * @param {Object} options 接口参数对象
                                            * 
                                            * 参数对象结构可以参考
                                            * @see http://lbs.qq.com/webservice_v1/guide-search.html
                                            */value: function search(
    options) {
      var that = this;
      options = options || {};

      Utils.polyfillParam(options);

      if (!Utils.checkKeyword(options)) {
        return;
      }

      var requestParam = {
        keyword: options.keyword,
        orderby: options.orderby || '_distance',
        page_size: options.page_size || 10,
        page_index: options.page_index || 1,
        output: 'json',
        key: that.key };


      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }

      if (options.filter) {
        requestParam.filter = options.filter;
      }

      var distance = options.distance || "1000";
      var auto_extend = options.auto_extend || 1;
      var region = null;
      var rectangle = null;

      //判断城市限定参数
      if (options.region) {
        region = options.region;
      }

      //矩形限定坐标(暂时只支持字符串格式)
      if (options.rectangle) {
        rectangle = options.rectangle;
      }

      var locationsuccess = function locationsuccess(result) {
        if (region && !rectangle) {
          //城市限定参数拼接
          requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else if (rectangle && !region) {
          //矩形搜索
          requestParam.boundary = "rectangle(" + rectangle + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else {
          requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SEARCH,
          data: requestParam },
        'search'));
      };
      Utils.locationProcess(options, locationsuccess);
    } }, { key: "getSuggestion",

    /**
                                  * sug模糊检索
                                  *
                                  * @param {Object} options 接口参数对象
                                  * 
                                  * 参数对象结构可以参考
                                  * http://lbs.qq.com/webservice_v1/guide-suggestion.html
                                  */value: function getSuggestion(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (!Utils.checkKeyword(options)) {
        return;
      }

      var requestParam = {
        keyword: options.keyword,
        region: options.region || '全国',
        region_fix: options.region_fix || 0,
        policy: options.policy || 0,
        page_size: options.page_size || 10, //控制显示条数
        page_index: options.page_index || 1, //控制页数
        get_subpois: options.get_subpois || 0, //返回子地点
        output: 'json',
        key: that.key };

      //长地址
      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }
      //过滤
      if (options.filter) {
        requestParam.filter = options.filter;
      }
      //排序
      if (options.location) {
        var locationsuccess = function locationsuccess(result) {
          requestParam.location = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_SUGGESTION,
            data: requestParam },
          "suggest"));
        };
        Utils.locationProcess(options, locationsuccess);
      } else {
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SUGGESTION,
          data: requestParam },
        "suggest"));
      }
    } }, { key: "reverseGeocoder",

    /**
                                    * 逆地址解析
                                    *
                                    * @param {Object} options 接口参数对象
                                    * 
                                    * 请求参数结构可以参考
                                    * http://lbs.qq.com/webservice_v1/guide-gcoder.html
                                    */value: function reverseGeocoder(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        coord_type: options.coord_type || 5,
        get_poi: options.get_poi || 0,
        output: 'json',
        key: that.key };

      if (options.poi_options) {
        requestParam.poi_options = options.poi_options;
      }

      var locationsuccess = function locationsuccess(result) {
        requestParam.location = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_GET_GEOCODER,
          data: requestParam },
        'reverseGeocoder'));
      };
      Utils.locationProcess(options, locationsuccess);
    } }, { key: "geocoder",

    /**
                             * 地址解析
                             *
                             * @param {Object} options 接口参数对象
                             * 
                             * 请求参数结构可以参考
                             * http://lbs.qq.com/webservice_v1/guide-geocoder.html
                             */value: function geocoder(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'address')) {
        return;
      }

      var requestParam = {
        address: options.address,
        output: 'json',
        key: that.key };


      //城市限定
      if (options.region) {
        requestParam.region = options.region;
      }

      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_GET_GEOCODER,
        data: requestParam },
      'geocoder'));
    } }, { key: "getCityList",


    /**
                                * 获取城市列表
                                *
                                * @param {Object} options 接口参数对象
                                * 
                                * 请求参数结构可以参考
                                * http://lbs.qq.com/webservice_v1/guide-region.html
                                */value: function getCityList(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        output: 'json',
        key: that.key };


      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_CITY_LIST,
        data: requestParam },
      'getCityList'));
    } }, { key: "getDistrictByCityId",

    /**
                                        * 获取对应城市ID的区县列表
                                        *
                                        * @param {Object} options 接口参数对象
                                        * 
                                        * 请求参数结构可以参考
                                        * http://lbs.qq.com/webservice_v1/guide-region.html
                                        */value: function getDistrictByCityId(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'id')) {
        return;
      }

      var requestParam = {
        id: options.id || '',
        output: 'json',
        key: that.key };


      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_AREA_LIST,
        data: requestParam },
      'getDistrictByCityId'));
    } }, { key: "calculateDistance",

    /**
                                      * 用于单起点到多终点的路线距离(非直线距离)计算：
                                      * 支持两种距离计算方式：步行和驾车。
                                      * 起点到终点最大限制直线距离10公里。
                                      *
                                      * 新增直线距离计算。
                                      * 
                                      * @param {Object} options 接口参数对象
                                      * 
                                      * 请求参数结构可以参考
                                      * http://lbs.qq.com/webservice_v1/guide-distance.html
                                      */value: function calculateDistance(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }

      var requestParam = {
        mode: options.mode || 'walking',
        to: Utils.location2query(options.to),
        output: 'json',
        key: that.key };


      if (options.from) {
        options.location = options.from;
      }

      //计算直线距离
      if (requestParam.mode == 'straight') {
        var locationsuccess = function locationsuccess(result) {
          var locationTo = Utils.getEndLocation(requestParam.to); //处理终点坐标
          var data = {
            message: "query ok",
            result: {
              elements: [] },

            status: 0 };

          for (var i = 0; i < locationTo.length; i++) {
            data.result.elements.push({ //将坐标存入
              distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng),
              duration: 0,
              from: {
                lat: result.latitude,
                lng: result.longitude },

              to: {
                lat: locationTo[i].lat,
                lng: locationTo[i].lng } });


          }
          var calculateResult = data.result.elements;
          var distanceResult = [];
          for (var i = 0; i < calculateResult.length; i++) {
            distanceResult.push(calculateResult[i].distance);
          }
          return options.success(data, {
            calculateResult: calculateResult,
            distanceResult: distanceResult });

        };

        Utils.locationProcess(options, locationsuccess);
      } else {
        var locationsuccess = function locationsuccess(result) {
          requestParam.from = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_DISTANCE,
            data: requestParam },
          'calculateDistance'));
        };

        Utils.locationProcess(options, locationsuccess);
      }
    } }, { key: "direction",

    /**
                              * 路线规划：
                              * 
                              * @param {Object} options 接口参数对象
                              * 
                              * 请求参数结构可以参考
                              * https://lbs.qq.com/webservice_v1/guide-road.html
                              */value: function direction(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }

      var requestParam = {
        output: 'json',
        key: that.key };


      //to格式处理
      if (typeof options.to == 'string') {
        requestParam.to = options.to;
      } else {
        requestParam.to = options.to.latitude + ',' + options.to.longitude;
      }
      //初始化局部请求域名
      var SET_URL_DIRECTION = null;
      //设置默认mode属性
      options.mode = options.mode || MODE.driving;

      //设置请求域名
      SET_URL_DIRECTION = URL_DIRECTION + options.mode;

      if (options.from) {
        options.location = options.from;
      }

      if (options.mode == MODE.driving) {
        if (options.from_poi) {
          requestParam.from_poi = options.from_poi;
        }
        if (options.heading) {
          requestParam.heading = options.heading;
        }
        if (options.speed) {
          requestParam.speed = options.speed;
        }
        if (options.accuracy) {
          requestParam.accuracy = options.accuracy;
        }
        if (options.road_type) {
          requestParam.road_type = options.road_type;
        }
        if (options.to_poi) {
          requestParam.to_poi = options.to_poi;
        }
        if (options.from_track) {
          requestParam.from_track = options.from_track;
        }
        if (options.waypoints) {
          requestParam.waypoints = options.waypoints;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
        if (options.plate_number) {
          requestParam.plate_number = options.plate_number;
        }
      }

      if (options.mode == MODE.transit) {
        if (options.departure_time) {
          requestParam.departure_time = options.departure_time;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
      }

      var locationsuccess = function locationsuccess(result) {
        requestParam.from = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: SET_URL_DIRECTION,
          data: requestParam },
        'direction'));
      };

      Utils.locationProcess(options, locationsuccess);
    } }]);return QQMapWX;}();
;

module.exports = QQMapWX;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*************************************!*\
  !*** E:/3.0/MaWeiTravel/pages.json ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 54:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 55);

/***/ }),

/***/ 55:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 56);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 56:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 57:
/*!*****************************************!*\
  !*** E:/3.0/MaWeiTravel/common/util.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//微信小程序自带时间

var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()
  // + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-');
};

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

module.exports = {
  formatTime: formatTime };

/***/ }),

/***/ 90:
/*!*****************************************************!*\
  !*** E:/3.0/MaWeiTravel/libs/qqmap-wx-jssdk.min.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var ERROR_CONF = { KEY_ERR: 311, KEY_ERR_MSG: 'key格式错误', PARAM_ERR: 310, PARAM_ERR_MSG: '请求参数信息有误', SYSTEM_ERR: 600, SYSTEM_ERR_MSG: '系统错误', WX_ERR_CODE: 1000, WX_OK_CODE: 200 };var BASE_URL = 'https://apis.map.qq.com/ws/';var URL_SEARCH = BASE_URL + 'place/v1/search';var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';var URL_CITY_LIST = BASE_URL + 'district/v1/list';var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';var URL_DISTANCE = BASE_URL + 'distance/v1/';var URL_DIRECTION = BASE_URL + 'direction/v1/';var MODE = { driving: 'driving', transit: 'transit' };var EARTH_RADIUS = 6378136.49;var Utils = { safeAdd: function safeAdd(x, y) {var lsw = (x & 0xffff) + (y & 0xffff);var msw = (x >> 16) + (y >> 16) + (lsw >> 16);return msw << 16 | lsw & 0xffff;}, bitRotateLeft: function bitRotateLeft(num, cnt) {return num << cnt | num >>> 32 - cnt;}, md5cmn: function md5cmn(q, a, b, x, s, t) {return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);}, md5ff: function md5ff(a, b, c, d, x, s, t) {return this.md5cmn(b & c | ~b & d, a, b, x, s, t);}, md5gg: function md5gg(a, b, c, d, x, s, t) {return this.md5cmn(b & d | c & ~d, a, b, x, s, t);}, md5hh: function md5hh(a, b, c, d, x, s, t) {return this.md5cmn(b ^ c ^ d, a, b, x, s, t);}, md5ii: function md5ii(a, b, c, d, x, s, t) {return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);}, binlMD5: function binlMD5(x, len) {x[len >> 5] |= 0x80 << len % 32;x[(len + 64 >>> 9 << 4) + 14] = len;var i;var olda;var oldb;var oldc;var oldd;var a = 1732584193;var b = -271733879;var c = -1732584194;var d = 271733878;for (i = 0; i < x.length; i += 16) {olda = a;oldb = b;oldc = c;oldd = d;a = this.md5ff(a, b, c, d, x[i], 7, -680876936);d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);b = this.md5gg(b, c, d, a, x[i], 20, -373897302);a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);d = this.md5hh(d, a, b, c, x[i], 11, -358537222);c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);a = this.md5ii(a, b, c, d, x[i], 6, -198630844);d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);a = this.safeAdd(a, olda);b = this.safeAdd(b, oldb);c = this.safeAdd(c, oldc);d = this.safeAdd(d, oldd);}return [a, b, c, d];}, binl2rstr: function binl2rstr(input) {var i;var output = '';var length32 = input.length * 32;for (i = 0; i < length32; i += 8) {output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);}return output;}, rstr2binl: function rstr2binl(input) {var i;var output = [];output[(input.length >> 2) - 1] = undefined;for (i = 0; i < output.length; i += 1) {output[i] = 0;}var length8 = input.length * 8;for (i = 0; i < length8; i += 8) {output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;}return output;}, rstrMD5: function rstrMD5(s) {return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));}, rstrHMACMD5: function rstrHMACMD5(key, data) {var i;var bkey = this.rstr2binl(key);var ipad = [];var opad = [];var hash;ipad[15] = opad[15] = undefined;if (bkey.length > 16) {bkey = this.binlMD5(bkey, key.length * 8);}for (i = 0; i < 16; i += 1) {ipad[i] = bkey[i] ^ 0x36363636;opad[i] = bkey[i] ^ 0x5c5c5c5c;}hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));}, rstr2hex: function rstr2hex(input) {var hexTab = '0123456789abcdef';var output = '';var x;var i;for (i = 0; i < input.length; i += 1) {x = input.charCodeAt(i);output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);}return output;}, str2rstrUTF8: function str2rstrUTF8(input) {return unescape(encodeURIComponent(input));}, rawMD5: function rawMD5(s) {return this.rstrMD5(this.str2rstrUTF8(s));}, hexMD5: function hexMD5(s) {return this.rstr2hex(this.rawMD5(s));}, rawHMACMD5: function rawHMACMD5(k, d) {return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));}, hexHMACMD5: function hexHMACMD5(k, d) {return this.rstr2hex(this.rawHMACMD5(k, d));}, md5: function md5(string, key, raw) {if (!key) {if (!raw) {return this.hexMD5(string);}return this.rawMD5(string);}if (!raw) {return this.hexHMACMD5(key, string);}return this.rawHMACMD5(key, string);}, getSig: function getSig(requestParam, sk, feature, mode) {var sig = null;var requestArr = [];Object.keys(requestParam).sort().forEach(function (key) {requestArr.push(key + '=' + requestParam[key]);});if (feature == 'search') {sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;}if (feature == 'suggest') {sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;}if (feature == 'reverseGeocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'geocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'getCityList') {sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;}if (feature == 'getDistrictByCityId') {sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;}if (feature == 'calculateDistance') {sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;}if (feature == 'direction') {sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;}sig = this.md5(sig);return sig;}, location2query: function location2query(data) {if (typeof data == 'string') {return data;}var query = '';for (var i = 0; i < data.length; i++) {var d = data[i];if (!!query) {query += ';';}if (d.location) {query = query + d.location.lat + ',' + d.location.lng;}if (d.latitude && d.longitude) {query = query + d.latitude + ',' + d.longitude;}}return query;}, rad: function rad(d) {return d * Math.PI / 180.0;}, getEndLocation: function getEndLocation(location) {var to = location.split(';');var endLocation = [];for (var i = 0; i < to.length; i++) {endLocation.push({ lat: parseFloat(to[i].split(',')[0]), lng: parseFloat(to[i].split(',')[1]) });}return endLocation;}, getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {var radLatFrom = this.rad(latFrom);var radLatTo = this.rad(latTo);var a = radLatFrom - radLatTo;var b = this.rad(lngFrom) - this.rad(lngTo);var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));distance = distance * EARTH_RADIUS;distance = Math.round(distance * 10000) / 10000;return parseFloat(distance.toFixed(0));}, getWXLocation: function getWXLocation(success, fail, complete) {wx.getLocation({ type: 'gcj02', success: success, fail: fail, complete: complete });}, getLocationParam: function getLocationParam(location) {if (typeof location == 'string') {var locationArr = location.split(',');if (locationArr.length === 2) {location = { latitude: location.split(',')[0], longitude: location.split(',')[1] };} else {location = {};}}return location;}, polyfillParam: function polyfillParam(param) {param.success = param.success || function () {};param.fail = param.fail || function () {};param.complete = param.complete || function () {};}, checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {if (!param[key]) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');param.fail(errconf);param.complete(errconf);return true;}return false;}, checkKeyword: function checkKeyword(param) {return !this.checkParamKeyEmpty(param, 'keyword');}, checkLocation: function checkLocation(param) {var location = this.getLocationParam(param.location);if (!location || !location.latitude || !location.longitude) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');param.fail(errconf);param.complete(errconf);return false;}return true;}, buildErrorConfig: function buildErrorConfig(errCode, errMsg) {return { status: errCode, message: errMsg };}, handleData: function handleData(param, data, feature) {if (feature == 'search') {var searchResult = data.data;var searchSimplify = [];for (var i = 0; i < searchResult.length; i++) {searchSimplify.push({ id: searchResult[i].id || null, title: searchResult[i].title || null, latitude: searchResult[i].location && searchResult[i].location.lat || null, longitude: searchResult[i].location && searchResult[i].location.lng || null, address: searchResult[i].address || null, category: searchResult[i].category || null, tel: searchResult[i].tel || null, adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null, city: searchResult[i].ad_info && searchResult[i].ad_info.city || null, district: searchResult[i].ad_info && searchResult[i].ad_info.district || null, province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });}param.success(data, { searchResult: searchResult, searchSimplify: searchSimplify });} else if (feature == 'suggest') {var suggestResult = data.data;var suggestSimplify = [];for (var i = 0; i < suggestResult.length; i++) {suggestSimplify.push({ adcode: suggestResult[i].adcode || null, address: suggestResult[i].address || null, category: suggestResult[i].category || null, city: suggestResult[i].city || null, district: suggestResult[i].district || null, id: suggestResult[i].id || null, latitude: suggestResult[i].location && suggestResult[i].location.lat || null, longitude: suggestResult[i].location && suggestResult[i].location.lng || null, province: suggestResult[i].province || null, title: suggestResult[i].title || null, type: suggestResult[i].type || null });}param.success(data, { suggestResult: suggestResult, suggestSimplify: suggestSimplify });} else if (feature == 'reverseGeocoder') {var reverseGeocoderResult = data.result;var reverseGeocoderSimplify = { address: reverseGeocoderResult.address || null, latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null, longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null, adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null, city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null, district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null, nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null, province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null, street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null, street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null, recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null, rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };if (reverseGeocoderResult.pois) {var pois = reverseGeocoderResult.pois;var poisSimplify = [];for (var i = 0; i < pois.length; i++) {poisSimplify.push({ id: pois[i].id || null, title: pois[i].title || null, latitude: pois[i].location && pois[i].location.lat || null, longitude: pois[i].location && pois[i].location.lng || null, address: pois[i].address || null, category: pois[i].category || null, adcode: pois[i].ad_info && pois[i].ad_info.adcode || null, city: pois[i].ad_info && pois[i].ad_info.city || null, district: pois[i].ad_info && pois[i].ad_info.district || null, province: pois[i].ad_info && pois[i].ad_info.province || null });}param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify, pois: pois, poisSimplify: poisSimplify });} else {param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify });}} else if (feature == 'geocoder') {var geocoderResult = data.result;var geocoderSimplify = { title: geocoderResult.title || null, latitude: geocoderResult.location && geocoderResult.location.lat || null, longitude: geocoderResult.location && geocoderResult.location.lng || null, adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null, province: geocoderResult.address_components && geocoderResult.address_components.province || null, city: geocoderResult.address_components && geocoderResult.address_components.city || null, district: geocoderResult.address_components && geocoderResult.address_components.district || null, street: geocoderResult.address_components && geocoderResult.address_components.street || null, street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null, level: geocoderResult.level || null };param.success(data, { geocoderResult: geocoderResult, geocoderSimplify: geocoderSimplify });} else if (feature == 'getCityList') {var provinceResult = data.result[0];var cityResult = data.result[1];var districtResult = data.result[2];param.success(data, { provinceResult: provinceResult, cityResult: cityResult, districtResult: districtResult });} else if (feature == 'getDistrictByCityId') {var districtByCity = data.result[0];param.success(data, districtByCity);} else if (feature == 'calculateDistance') {var calculateDistanceResult = data.result.elements;var distance = [];for (var i = 0; i < calculateDistanceResult.length; i++) {distance.push(calculateDistanceResult[i].distance);}param.success(data, { calculateDistanceResult: calculateDistanceResult, distance: distance });} else if (feature == 'direction') {var direction = data.result.routes;param.success(data, direction);} else {param.success(data);}}, buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {var that = this;options.header = { "content-type": "application/json" };options.method = 'GET';options.success = function (res) {var data = res.data;if (data.status === 0) {that.handleData(param, data, feature);} else {param.fail(data);}};options.fail = function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};options.complete = function (res) {var statusCode = +res.statusCode;switch (statusCode) {case ERROR_CONF.WX_ERR_CODE:{param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));break;}case ERROR_CONF.WX_OK_CODE:{var data = res.data;if (data.status === 0) {param.complete(data);} else {param.complete(that.buildErrorConfig(data.status, data.message));}break;}default:{param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));}}};return options;}, locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {var that = this;locationfail = locationfail || function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};locationcomplete = locationcomplete || function (res) {if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));}};if (!param.location) {that.getWXLocation(locationsuccess, locationfail, locationcomplete);} else if (that.checkLocation(param)) {var location = Utils.getLocationParam(param.location);locationsuccess(location);}} };var QQMapWX = /*#__PURE__*/function () {"use strict";function QQMapWX(options) {_classCallCheck(this, QQMapWX);if (!options.key) {throw Error('key值不能为空');}this.key = options.key;}_createClass(QQMapWX, [{ key: "search", value: function search(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, orderby: options.orderby || '_distance', page_size: options.page_size || 10, page_index: options.page_index || 1, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}var distance = options.distance || "1000";var auto_extend = options.auto_extend || 1;var region = null;var rectangle = null;if (options.region) {region = options.region;}if (options.rectangle) {rectangle = options.rectangle;}var locationsuccess = function locationsuccess(result) {if (region && !rectangle) {requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else if (rectangle && !region) {requestParam.boundary = "rectangle(" + rectangle + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else {requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SEARCH, data: requestParam }, 'search'));};Utils.locationProcess(options, locationsuccess);} }, { key: "getSuggestion", value: function getSuggestion(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, region: options.region || '全国', region_fix: options.region_fix || 0, policy: options.policy || 0, page_size: options.page_size || 10, page_index: options.page_index || 1, get_subpois: options.get_subpois || 0, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}if (options.location) {var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));};Utils.locationProcess(options, locationsuccess);} else {if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));}} }, { key: "reverseGeocoder", value: function reverseGeocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { coord_type: options.coord_type || 5, get_poi: options.get_poi || 0, output: 'json', key: that.key };if (options.poi_options) {requestParam.poi_options = options.poi_options;}var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'reverseGeocoder'));};Utils.locationProcess(options, locationsuccess);} }, { key: "geocoder", value: function geocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'address')) {return;}var requestParam = { address: options.address, output: 'json', key: that.key };if (options.region) {requestParam.region = options.region;}if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'geocoder'));} }, { key: "getCityList", value: function getCityList(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_CITY_LIST, data: requestParam }, 'getCityList'));} }, { key: "getDistrictByCityId", value: function getDistrictByCityId(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'id')) {return;}var requestParam = { id: options.id || '', output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_AREA_LIST, data: requestParam }, 'getDistrictByCityId'));} }, { key: "calculateDistance", value: function calculateDistance(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { mode: options.mode || 'walking', to: Utils.location2query(options.to), output: 'json', key: that.key };if (options.from) {options.location = options.from;}if (requestParam.mode == 'straight') {var locationsuccess = function locationsuccess(result) {var locationTo = Utils.getEndLocation(requestParam.to);var data = { message: "query ok", result: { elements: [] }, status: 0 };for (var i = 0; i < locationTo.length; i++) {data.result.elements.push({ distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng), duration: 0, from: { lat: result.latitude, lng: result.longitude }, to: { lat: locationTo[i].lat, lng: locationTo[i].lng } });}var calculateResult = data.result.elements;var distanceResult = [];for (var i = 0; i < calculateResult.length; i++) {distanceResult.push(calculateResult[i].distance);}return options.success(data, { calculateResult: calculateResult, distanceResult: distanceResult });};Utils.locationProcess(options, locationsuccess);} else {var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_DISTANCE, data: requestParam }, 'calculateDistance'));};Utils.locationProcess(options, locationsuccess);}} }, { key: "direction", value: function direction(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { output: 'json', key: that.key };if (typeof options.to == 'string') {requestParam.to = options.to;} else {requestParam.to = options.to.latitude + ',' + options.to.longitude;}var SET_URL_DIRECTION = null;options.mode = options.mode || MODE.driving;SET_URL_DIRECTION = URL_DIRECTION + options.mode;if (options.from) {options.location = options.from;}if (options.mode == MODE.driving) {if (options.from_poi) {requestParam.from_poi = options.from_poi;}if (options.heading) {requestParam.heading = options.heading;}if (options.speed) {requestParam.speed = options.speed;}if (options.accuracy) {requestParam.accuracy = options.accuracy;}if (options.road_type) {requestParam.road_type = options.road_type;}if (options.to_poi) {requestParam.to_poi = options.to_poi;}if (options.from_track) {requestParam.from_track = options.from_track;}if (options.waypoints) {requestParam.waypoints = options.waypoints;}if (options.policy) {requestParam.policy = options.policy;}if (options.plate_number) {requestParam.plate_number = options.plate_number;}}if (options.mode == MODE.transit) {if (options.departure_time) {requestParam.departure_time = options.departure_time;}if (options.policy) {requestParam.policy = options.policy;}}var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);}wx.request(Utils.buildWxRequestConfig(options, { url: SET_URL_DIRECTION, data: requestParam }, 'direction'));};Utils.locationProcess(options, locationsuccess);} }]);return QQMapWX;}();;module.exports = QQMapWX;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map