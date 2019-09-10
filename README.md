# Description
HtmlTagChecker.class.js defined a class HtmlTagChecker that could solve html tag intigrity check.\n
HtmlTagCheckerTest.js is an example of HtmlTagChecker using.\n

The kernel function in HtmlTagChecker is TagIntigritiyCheck(tagAry).\n
It will use recursion to solve html tag intigrity check.\n

More detail comments are in the code files.\n

# Test
npm install\n
npm test\n

# Example result
-------------  Case 0: Correctly tagged paragraph.  -------------\n

-------------  Case 1: Correctly tagged paragraph.  -------------\n

-------------  Case 2: 2 errors in this paragraph.  -------------\n
               Expect </C> found </B>\n
               Expect # found </C>\n

-------------  Case 3: 1 errors in this paragraph.  -------------\n
               Expect # found </C>\n

-------------  Case 4: 1 errors in this paragraph.  -------------\n
               Expect </B> found #\n

-------------  Case 5: 4 errors in this paragraph.  -------------\n
               Expect </C> found </B>\n
               Expect # found </C>\n
               Expect # found </C>\n
               Expect </B> found #\n