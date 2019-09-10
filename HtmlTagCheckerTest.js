const HtmlTagChecker = require("./HtmlTagChecker.class");

// Running example
var paragraphAry = [];

paragraphAry.push("The following text<C><B>is centred and in boldface</B></C>");
paragraphAry.push("<B>This <\g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence");
paragraphAry.push("<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>");
paragraphAry.push("<B>This should be in boldface, but there is an extra closing tag</B></C>");
paragraphAry.push("<B><C>This should be centred and in boldface, but there is a missing closing tag</C>");

paragraphAry.push("<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>" + 
                "<B>This should be in boldface, but there is an extra closing tag</B></C>" +
                "<B><C>This should be centred and in boldface, but there is a missing closing tag</C>");

paragraphAry.forEach(function (element, idx) {

    var htmlTagChecker = new HtmlTagChecker();
    // Extract all tags into an array.
    var tags = element.match(/<\/?[A-Z]+>/g);

    htmlTagChecker.tagIntigritiyCheck(tags);
    
    // Print all errors.
    if (htmlTagChecker.errorAry == null || htmlTagChecker.errorAry.length == 0) {
        console.log("\n-------------  Case " + idx + ": Correctly tagged paragraph.  -------------");
    }
    else {
        console.log("\n-------------  Case " + idx + ": " + htmlTagChecker.errorAry.length + " errors in this paragraph.  -------------");
        htmlTagChecker.errorAry.forEach(element => {
            console.log("               Expect " + element[0] + " found " + element[1]);
        });
    }
});