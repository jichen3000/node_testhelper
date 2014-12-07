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
}).call(this);

if ( require.main == module) {
  obj = {foo:"bar", baz: {aa:1, bb:2}};
  p(obj); // ignore this situation, return null
  obj.p(); // obj : { foo: 'bar', baz: { aa: 1, bb: 2 } }, return obj

  puts("end!");
}