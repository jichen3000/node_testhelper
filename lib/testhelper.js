var commons = require("./commons");
var util    = require("util");

var puts = console.log;

(function () {
  Object.prototype.p = function () {
    return commons.commonP(this, false);
  }

  Object.prototype.pl = function () {
    return commons.commonP(this, true);
  }
}).call(this);

if ( require.main == module) {
  obj = {foo:"bar", baz: {aa:1, bb:2}};
  p(obj); // ignore this situation, return null
  obj.p(); // obj : { foo: 'bar', baz: { aa: 1, bb: 2 } }, return obj

  obj.pl();
  puts("end!");
}