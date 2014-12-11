var fs         = require('fs');
var util       = require('util');

var commons = module.exports;
var puts = console.log;

function getStack () {
  // callsite
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack) {
    return stack;
  };
  var err = new Error;
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
}

commons.getCalleeStrSync = function (filePath, lineNumber, columnNumber) {
  var data = fs.readFileSync(filePath, {encoding: 'utf-8'});
  var curLine = data.split(/\r?\n/)[lineNumber-1];
  var callee = curLine.substring(0, columnNumber);
  callee = callee.trim()
  callee = callee.substring(0, callee.lastIndexOf("."));
  return callee;
}

commons.getCodePosition = function (filePath, lineNumber, columnNumber, funcName) {
  //   File "/Users/colin/work/node_testhelper/lib/testhelper.js", line 30, in <anonymous>
  return util.format('  File "%s", line %d, in %s', filePath, lineNumber, funcName);
}

commons.getPositionInfo = function (frameIndex){
  // frameIndex's default value = 2
  frameIndex = typeof frameIndex !== 'undefined' ? frameIndex : 2;
  var curFrame = getStack()[frameIndex];
  return [curFrame.getFileName(), curFrame.getLineNumber(), 
      curFrame.getColumnNumber(), curFrame.getFunctionName() || '<anonymous>']
};


function objectToString(o) {
  return Object.prototype.toString.call(o);
}
function isUndefined(arg) {
  return arg === void 0;
}
function isNumberWrong(arg) {
  return typeof arg === 'number';
  // return !isNaN(parseFloat(arg));
}
function isNumber(arg) {
  // return typeof arg === 'number';
  return !isNaN(parseFloat(arg));
}
function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
function isFunction(arg) {
  return typeof arg === 'function';
}
function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
function isNaNObject(arg) {
  return Object.keys(arg).length===0 && isNaN(arg);
}
function isString(arg) {
  return typeof arg === 'string';
}
commons.genSimpleStr = function (obj) {
  // puts(Object.keys(obj).length);
  if(isObject(obj) && Object.keys(obj).length===0 && isNaN(obj)) return 'NaN';
  if (isNumber(obj)) return obj.toString();
  return util.inspect(obj);
}

commons.genPrettyStr = function (obj) {
  // if(isObject(obj) && Object.keys(obj).length===0 && isNaN(obj)) return 'NaN';
  var cache = [];
  var result = JSON.stringify(obj, function (key, value) {
    if (isObject(value)){
      if (cache.indexOf(value) !== -1) {
        // circular reference found
        return '[circular]';
      }
      cache.push(value);
    }
    // puts("v:"+value);
    if(!isString(value) && isNaN(value) && !isObject(value) && !isFunction(value)) return 'NaN';
    // if (isUndefined(value)) {
    //   return '' + value;
    // }
    if (isNumber(value) && (isNaN(value) || !isFinite(value))) {
      return value.toString();
    }
    if (isFunction(value) || isRegExp(value)) {
      return value.toString();
      // return '[function]';
    }
    return value;
    
  }, 2);
  cache=null;
  return result;
}

if (require.main === module){
  var assert = require('assert');
  var posInfo = commons.getPositionInfo(1);
  // assert.deepEqual(posInfo, ["/Users/colin/work/node_testhelper/lib/commons.js",40,25,"anonymous"]);
  assert.deepEqual(posInfo[0], "/Users/colin/work/node_testhelper/lib/commons.js");

  assert.deepEqual(commons.getCalleeStrSync.apply(this, posInfo), 'var posInfo = commons');

  assert.equal(commons.getCodePosition("/Users/colin/work/node_testhelper/lib/commons.js",46,25,"<anonymous>"),
      '  File "/Users/colin/work/node_testhelper/lib/commons.js", line 46, in <anonymous>');

  var obj = {mykey:1, myfun:function (argument) {
    console.log(argument);
    return argument;
  }};
  obj.obj = obj;

  assert.equal(commons.genSimpleStr(123), '123');
  var returnThis = function (arg) {
    return arg;
  }
  var mm=123;
  assert.equal(isNumber(returnThis(mm)), true);
  assert.equal(commons.genSimpleStr(mm), '123');
  assert.equal(commons.genSimpleStr(true), 'true');
  assert.equal(commons.genSimpleStr(NaN), 'NaN');
  assert.equal(commons.genSimpleStr(returnThis), '[Function]');
  assert.equal(commons.genPrettyStr(returnThis), "\"function (arg) {\\n    return arg;\\n  }\"");

  assert.equal(commons.genPrettyStr(obj), 
    '{\n  "mykey": 1,\n  "myfun": "function (argument) {\\n    console.log(argument);\\n    return argument;\\n  }",\n  "obj": "[circular]"\n}')
}