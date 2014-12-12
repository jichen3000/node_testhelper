var commons = require("./commons");
var util    = require("util");
var puts = console.log;


(function () {
  var p = function () {
    var posInfo = commons.getPositionInfo(2);
    calleeStr = commons.getCalleeStrSync.apply(null, posInfo);
    if (calleeStr===''){return null;}
    puts(util.format('%s : %s', calleeStr, commons.genSimpleStr(this)));
    return this;
  };

  var pl = function () {
    var posInfo = commons.getPositionInfo(2);
    calleeStr = commons.getCalleeStrSync.apply(null, posInfo);
    if (calleeStr===''){return null;}
    puts("");
    puts(commons.getCodePosition.apply(null, posInfo));
    puts(util.format('%s : %s', calleeStr, commons.genSimpleStr(this)));
    return this;
  };

  var pp = function () {
    var posInfo = commons.getPositionInfo(2);
    calleeStr = commons.getCalleeStrSync.apply(null, posInfo);
    if (calleeStr===''){return null;}
    puts(util.format('%s : \n%s', calleeStr, commons.genPrettyStr(this)));
    return this;
  };

  var ppl = function () {
    var posInfo = commons.getPositionInfo(2);
    calleeStr = commons.getCalleeStrSync.apply(null, posInfo);
    if (calleeStr===''){return null;}
    puts("");
    puts(commons.getCodePosition.apply(null, posInfo));
    puts(util.format('%s : \n%s', calleeStr, commons.genPrettyStr(this)));
    return this;
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
}).call(this);

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



  (function(){
    var oldLog = puts;
    puts = function (msg) {
      msgCache.push(msg);
      oldLog.apply(console, arguments);
    }
  })();
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
  // pp(obj);

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
  assert.deepEqual(getMsgs(), [ 'NaN : \nNaN' ]);

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
}
