require('../lib/testhelper');

if (require.main === module) {
  var obj = {foo:"bar", baz: {aa:1, bb:2}};
  p(obj); // ignore this situation, return null
  obj.p(); // obj : { foo: 'bar', baz: { aa: 1, bb: 2 } }, return obj

  obj.pl();

  obj.pp();
  
  obj.ppl();
  // pp(obj);

  var a = {bb:1}
  for (key in a) console.log(key);

  // number is not yet supported
  1.p();
  (typeof 1).pp();
  "123".p();
  true.pp();

  var the_func = function (argument) {
      argument.pp();
  };

  the_func.pp();
  // null.pp();
  var the_null = null;
  // the_null.pp();
}