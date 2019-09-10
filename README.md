# Description
HtmlTagChecker.class.js defined a class HtmlTagChecker that could solve html tag intigrity check.  
HtmlTagCheckerTest.js is an example of HtmlTagChecker using.  

The kernel function in HtmlTagChecker is TagIntigritiyCheck(tagAry).  
It will use recursion to solve html tag intigrity check.  

More detail comments are in the code files.

# Test
npm install  
npm test

# Example result
－－－－－－－－　Case 0: Correctly tagged paragraph.　－－－－－－－－  

－－－－－－－－　Case 1: Correctly tagged paragraph.　－－－－－－－－  

－－－－－－－－　Case 2: 2 errors in this paragraph.　－－－－－－－－  
　　　　　　　　　Expect \</C\> found \</B\>  
　　　　　　　　　Expect # found \</C\>  

－－－－－－－－　Case 3: 1 errors in this paragraph.　－－－－－－－－  
　　　　　　　　　Expect # found \</C\>  

－－－－－－－－　Case 4: 1 errors in this paragraph.　－－－－－－－－  
　　　　　　　　　Expect \</B\> found #  

－－－－－－－－　Case 5: 4 errors in this paragraph.　－－－－－－－－  
　　　　　　　　　Expect \</C\> found \</B\>  
　　　　　　　　　Expect # found \</C\>  
　　　　　　　　　Expect # found \</C\>  
　　　　　　　　　Expect \</B\> found #  