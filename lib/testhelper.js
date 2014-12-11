var commons = require("./commons");
var util    = require("util");
var puts = console.log;


(function () {
  var p = function () {
    var posInfo = commons.getPositionInfo(2);
    // puts("this:"+this)
    // puts("typeof this:"+(typeof this))
    // puts("isNaN this:"+(!isNaN(parseFloat(this)) ))
    // puts("inspect this:"+(util.inspect(this) ))
    // puts("inspect this:"+(isNaN(this) ))
    // puts("this2:"+commons.genSimpleStr(this))
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
  var obj = {foo:"bar", baz: {aa:1, bb:2}};
  p(obj); // ignore this situation, return null
  obj.p(); // obj : { foo: 'bar', baz: { aa: 1, bb: 2 } }, return obj

  obj.pl();

  obj.pp();
  
  obj.ppl();
  // pp(obj);
  puts("end!");

  // notice, the p, pl would not appear in the a_obj object.
  var a_obj = {bb:1};
  for (key in a_obj) console.log(key);

  the_num = 123;
  the_num.p();
  the_num.pp();

  (123).p();

  NaN.p();
  NaN.pl();
  NaN.pp();
  var obj={b:1, a:NaN}
  obj.p();
  obj.pp();
  // NaN.pl();

  // Object.defineProperty( null, "pl", {
  //   value: pl,
  //   enumerable: false
  // });
}
