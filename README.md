# Test Helper

This project is inspired by Python minitest's some useful methods which could be used in test.
The below are useful functions:

    p, pp, pl, ppl

github: [https://github.com/jichen3000/node_testhelper](https://github.com/jichen3000/node_testhelper)

-----------------------

### Author

Colin Ji <jichen3000@gmail.com>


### How to install

    npm install testhelper

### How to use

p, print with title. This function will print variable name as the title.
<br>code:
    
    obj = {foo:"bar", baz: {aa:1, bb:2}};
    // add a title 'obj' automatically.
    obj.p()

print result:

    obj : { foo: 'bar', baz: { aa: 1, bb: 2 } }

pl, print with title and code loction. This function just like pt, but will print
the code location at the first line.
And some editors support to go to the line of that file, such as Sublime2.
Notice: it will print a null line before the location information.
<br>code:
    
    obj = {foo:"bar", baz: {aa:1, bb:2}};
    // add a empty line, and a code position line.
    // add a title 'obj' automatically.
    obj.pl()

print result:


      File "/Users/colin/work/node_testhelper/lib/testhelper.js", line 21, in <anonymous>
    obj : { foo: 'bar', baz: { aa: 1, bb: 2 } }

pp, prety print with title. This function will print variable name as the title.
<br>code:
    
    obj = {foo:"bar", baz: {aa:1, bb:2}};
    // add a title 'obj' automatically.
    obj.pp()

print result:

    obj : 
    {
      "foo": "bar",
      "baz": {
        "aa": 1,
        "bb": 2
      }
    }

ppl, pretty print with title and code loction. This function just like pt, but will print
the code location at the first line.
And some editors support to go to the line of that file, such as Sublime2.
Notice: it will print a null line before the location information.
<br>code:
    
    obj = {foo:"bar", baz: {aa:1, bb:2}};
    // add a empty line, and a code position line.
    // add a title 'obj' automatically.
    obj.ppl()

print result:


      File "/Users/colin/work/node_testhelper/lib/testhelper.js", line 52, in <anonymous>
    obj : 
    {
      "foo": "bar",
      "baz": {
        "aa": 1,
        "bb": 2
      }
    }
