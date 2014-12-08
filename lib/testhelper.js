var commons = require("./commons");
var util    = require("util");
var puts = console.log;



(function () {
  Object.prototype.p = function () {
    var posInfo = commons.getPositionInfo(2);
    calleeStr = commons.getCalleeStrSync.apply(null, posInfo);
    if (calleeStr===''){return null;}
    puts(util.format('%s : %s', calleeStr, util.inspect(this)));
    return this;
  }

  Object.prototype.pl = function () {
    var posInfo = commons.getPositionInfo(2);
    calleeStr = commons.getCalleeStrSync.apply(null, posInfo);
    if (calleeStr===''){return null;}
    puts("");
    puts(commons.getCodePosition.apply(null, posInfo));
    puts(util.format('%s : %s', calleeStr, util.inspect(this)));
    return this;
  }
  Object.prototype.pp = function () {
    var posInfo = commons.getPositionInfo(2);
    calleeStr = commons.getCalleeStrSync.apply(null, posInfo);
    if (calleeStr===''){return null;}
    puts(util.format('%s : \n%s', calleeStr, commons.genPrettyStr(this)));
    return this;
  }
  Object.prototype.ppl = function () {
    var posInfo = commons.getPositionInfo(2);
    calleeStr = commons.getCalleeStrSync.apply(null, posInfo);
    if (calleeStr===''){return null;}
    puts("");
    puts(commons.getCodePosition.apply(null, posInfo));
    puts(util.format('%s : \n%s', calleeStr, commons.genPrettyStr(this)));
    return this;
  }
}).call(this);

if ( require.main === module) {
  obj = {foo:"bar", baz: {aa:1, bb:2}};
  p(obj); // ignore this situation, return null
  obj.p(); // obj : { foo: 'bar', baz: { aa: 1, bb: 2 } }, return obj

  obj.pl();

  obj.pp();
  
  obj.ppl();
  // pp(obj);
  puts("end!");
}
