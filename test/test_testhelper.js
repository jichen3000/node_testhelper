require('../lib/testhelper');

if (require.main === module) {
  obj = {foo:"bar", baz: {aa:1, bb:2}};
  p(obj); // ignore this situation, return null
  obj.p(); // obj : { foo: 'bar', baz: { aa: 1, bb: 2 } }, return obj    
  obj.pl();
  obj.pp();
  obj.ppl();
}