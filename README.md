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
    
    name = "Test Helper"
    // add a title 'name : ' automatically.
    name.p()                       

print result:

    name : Test Helper

ptl, print with title and code loction. This function just like pt, but will print
the code location at the first line.
And some editors support to go to the line of that file, such as Sublime2.
Notice: it will print a null line before the location information.
<br>code:
    
    name = "Test Helper"
    // add a title 'name : ' automatically.
    name.ptl()   

print result:

      File "/Users/colin/work/node_testhelper/lib/testhelper.js", line 21, in <anonymous>
    name : Test Helper
