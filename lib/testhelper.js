var prettyPrintString = require("./pretty_print_string");
var stackInfo = require("./stack_info");
var originalThis = require("./original_this");
var util    = require("util");
var puts = console.log;


var p = function () {
  var posInfo = stackInfo.getCallerFramePositionInfo();
  // puts(posInfo);
  calleeStr = stackInfo.getCalleeStrSync.apply(null, posInfo);
  if (calleeStr===''){return null;}
  var originalObject = originalThis(this);
  puts(util.format('%s : %s', calleeStr, prettyPrintString.genSimpleStr(originalObject)));
  return originalObject;
};

var pl = function () {
  var posInfo = stackInfo.getCallerFramePositionInfo();
  calleeStr = stackInfo.getCalleeStrSync.apply(null, posInfo);
  if (calleeStr===''){return null;}
  var originalObject = originalThis(this);
  puts("");
  puts("  "+stackInfo.getCodePosition.apply(null, posInfo));
  puts(util.format('%s : %s', calleeStr, prettyPrintString.genSimpleStr(originalObject)));
  return originalObject;
};

var pp = function () {
  var posInfo = stackInfo.getCallerFramePositionInfo();
  calleeStr = stackInfo.getCalleeStrSync.apply(null, posInfo);
  if (calleeStr===''){return null;}
  var originalObject = originalThis(this);
  puts(util.format('%s : \n%s', calleeStr, prettyPrintString.genPrettyStr(originalObject)));
  return originalObject;
};

var ppl = function () {
  var posInfo = stackInfo.getCallerFramePositionInfo();
  calleeStr = stackInfo.getCalleeStrSync.apply(null, posInfo);
  if (calleeStr===''){return null;}
  var originalObject = originalThis(this);
  puts("");
  puts("  "+stackInfo.getCodePosition.apply(null, posInfo));
  puts(util.format('%s : \n%s', calleeStr, prettyPrintString.genPrettyStr(originalObject)));
  return originalObject;
};

Object.defineProperty( Object.prototype, "p", {
  value: p,
  enumerable: false
});

Object.defineProperty( Object.prototype, "pl", {
  value: pl,
  enumerable: false
});

Object.defineProperty( Object.prototype, "pp", {
  value: pp,
  enumerable: false
});

Object.defineProperty( Object.prototype, "ppl", {
  value: ppl,
  enumerable: false
});

Object.defineProperty( Number.prototype, "p", {
  value: p,
  enumerable: false
});

Object.defineProperty( Number.prototype, "pl", {
  value: pl,
  enumerable: false
});

Object.defineProperty( Number.prototype, "pp", {
  value: pp,
  enumerable: false
});

Object.defineProperty( Number.prototype, "ppl", {
  value: ppl,
  enumerable: false
});

if ( require.main === module) {
  var assert = require('assert');
  // for test log messages
  var msgCache = [];

  function getMsgs (isClean) {
    isClean = typeof isClean !== 'undefined' ? isClean : true;
    var msgArr = msgCache.slice(0);
    if (isClean) msgCache.length = 0;
    return msgArr;
  }

  var oldLog = puts;
  puts = function (msg) {
    msgCache.push(msg);
    oldLog.apply(console, arguments);
  }
  // end

  var obj = {foo:"bar", baz: {aa:1, bb:2}};
  p(obj); // ignore this situation, return null
  obj.p(); // obj : { foo: 'bar', baz: { aa: 1, bb: 2 } }, return obj
  assert.deepEqual(getMsgs(), ["obj : { foo: 'bar', baz: { aa: 1, bb: 2 } }"]);

  obj.pl();
  assert.deepEqual(getMsgs(), 
      [ '',
        '  File "/Users/colin/work/node_testhelper/lib/testhelper.js", line 113, in <anonymous>',
        'obj : { foo: \'bar\', baz: { aa: 1, bb: 2 } }' ]);

  obj.pp();
  assert.deepEqual(getMsgs(), [ 'obj : \n{\n  "foo": "bar",\n  "baz": {\n    "aa": 1,\n    "bb": 2\n  }\n}' ]);
  
  obj.ppl();
  assert.deepEqual(getMsgs(), 
      [ '',
        '  File "/Users/colin/work/node_testhelper/lib/testhelper.js", line 122, in <anonymous>',
        'obj : \n{\n  "foo": "bar",\n  "baz": {\n    "aa": 1,\n    "bb": 2\n  }\n}' ]);
  pp(obj);

  // notice, the p, pl would not appear in the a_obj object.
  var a_obj = {bb:1};
  for (key in a_obj) puts(key);
  assert.deepEqual(getMsgs(), [ 'bb' ]);

  the_num = 123;
  the_num.p();
  assert.deepEqual(getMsgs(), [ 'the_num : 123' ]);
  the_num.pp();
  assert.deepEqual(getMsgs(), [ 'the_num : \n123' ]);

  (123).p();
  assert.deepEqual(getMsgs(), [ '(123) : 123' ]);

  NaN.p();
  assert.deepEqual(getMsgs(), [ 'NaN : NaN' ]);
  NaN.pp();
  assert.deepEqual(getMsgs(), [ 'NaN : \n"NaN"' ]);

  var obj={b:1, a:NaN}
  obj.p();
  assert.deepEqual(getMsgs(), [ 'obj : { b: 1, a: NaN }' ]);
  obj.pp();
  assert.deepEqual(getMsgs(), [ 'obj : \n{\n  "b": 1,\n  "a": "NaN"\n}' ]);

  true.p();
  assert.deepEqual(getMsgs(), [ 'true : true' ]);
  false.p();
  assert.deepEqual(getMsgs(), [ 'false : false' ]);
  true.pp(); 
  assert.deepEqual(getMsgs(), [ 'true : \ntrue' ]);

  "ok".p(); 
  assert.deepEqual(getMsgs(), [ "\"ok\" : ok" ]);
  "ok".pp(); 
  assert.deepEqual(getMsgs(), [ "\"ok\" : \n\"ok\"" ]);

  [1,2].p();
  assert.deepEqual(getMsgs(), [ '[1,2] : [ 1, 2 ]' ]);
  [1,2].pp();
  assert.deepEqual(getMsgs(), [ '[1,2] : \n[\n  1,\n  2\n]' ]);
  [{a:1},{b:2}].p();
  assert.deepEqual(getMsgs(), [ '[{a:1},{b:2}] : [ { a: 1 }, { b: 2 } ]' ]);
  [{a:1},{b:2}].pp();
  assert.deepEqual(getMsgs(), [ '[{a:1},{b:2}] : \n[\n  {\n    "a": 1\n  },\n  {\n    "b": 2\n  }\n]' ]);
  ['s','t'].p();
  assert.deepEqual(getMsgs(), [ "['s','t'] : [ 's', 't' ]" ]);
  ['s','t'].pp();
  assert.deepEqual(getMsgs(), [ "['s','t'] : \n[\n  \"s\",\n  \"t\"\n]" ]);

}
