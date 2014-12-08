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

commons.getPositionInfo = function(frameIndex){
  // frameIndex's default value = 2
  frameIndex = typeof frameIndex !== 'undefined' ? frameIndex : 2;
  var curFrame = getStack()[frameIndex];
  return [curFrame.getFileName(), curFrame.getLineNumber(), 
      curFrame.getColumnNumber(), curFrame.getFunctionName() || '<anonymous>']
};

commons.commonP = function (obj, withCodePosition) {
  var posInfo = commons.getPositionInfo(3);
  calleeStr = commons.getCalleeStrSync.apply(null, posInfo);
  if (calleeStr===''){return null;}
  if (withCodePosition){
    puts("");
    puts(commons.getCodePosition.apply(null, posInfo));
  }
  puts(util.format('%s : %s', calleeStr, util.inspect(obj)));
  return obj;
}



if (require.main == module){
  var assert = require('assert');
  var posInfo = commons.getPositionInfo(1);
  // assert.deepEqual(posInfo, ["/Users/colin/work/node_testhelper/lib/commons.js",40,25,"anonymous"]);
  assert.deepEqual(posInfo[0], "/Users/colin/work/node_testhelper/lib/commons.js");

  assert.deepEqual(commons.getCalleeStrSync.apply(this, posInfo), 'var posInfo = commons');

  console.log(commons.getCodePosition("/Users/colin/work/node_testhelper/lib/commons.js",46,25,"<anonymous>"))
}