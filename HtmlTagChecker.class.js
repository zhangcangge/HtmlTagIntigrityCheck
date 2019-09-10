// ***************************************************************************************************
// Created on 2019-9-10
// This file defined a class: HtmlTagChecker.
// The kernel function in HtmlTagChecker is TagIntigritiyCheck(tagAry).
// It will use recursion to solve html tag intigrity check.
//
// For a common paragraph like "<B><C> First phrase </B></C> <B> Second phrase </B></C>",
//                     this program will extract all tags in to an array, that is
//                     [<B>, <C>, </B>, </C> <B> </B> <C>].
//
//                     Then this program will transfer this array to TagIntigritiyCheck.
//                     TagIntigritiyCheck will find the first opening tag, that is <B>, then it will 
//                     find the cloest corresponding closing tag, that is </B> and the index of it is 2.
//                     Now the TagIntigritiyCheck will split the tag array into two arrays from index 2, 
//                     they are [<B>, <C>, </B>] and [</C> <B> </B> <C>].
//                     
//                     This two arrays will be transfered to TagIntigritiyCheck separately to recurse.
//                     
// There has one special case need extra process. The case is many same tags embedded each other.
//                     Such as [<B>, <B>, </B>, <B>, </B>, <B>, </B>]. More detail comment for 
//                     processing this case can be seen in the following code.
//                     
// Author: CangGe Zhang
// ***************************************************************************************************

class HtmlTagChecker {
    constructor() {
        this.errorAry = [];
    }

    // TagIntigritiyCheck will run recursively to check the tag intigrity for one html paragraph.
    // Parameter:
    // tagAry: is an array that contain all tags in one paragraph.
    tagIntigritiyCheck(tagAry) {

        if (tagAry == null || tagAry.length == 0) {
            console.log("Tag array is empty!");
            return;
        }

        // If the first tag is closing tag, that must be error, record the error into errorAry.
        // Use the rest tags as a new array, transfer it to TagIntigritiyCheck to recurse.
        let tag = tagAry[0].match(/<\/[A-Z]+>/);
        if (tag != null) {
            this.errorAry.push(["#", tag]);
            let subTagAry = tagAry.slice(1);

            if (subTagAry != null && subTagAry.length > 0) {
                this.tagIntigritiyCheck(subTagAry);
            }
        }
        else {
            // Get the first tag in the paragraph.
            // Create corresponding closing tag for first tag.
            let startTag = tagAry[0];
            let endTag = this.createEndTag(startTag);

            // If the paragraph contain only one tag, that must be an error, record the error and return.
            if (1 == tagAry.length) {
                this.errorAry.push([endTag, "#"]);
                return
            }

            // Find the index of the corresponding closing tag for first tag.
            let endTagIndex = tagAry.indexOf(endTag, 0);

            // If there is no corresponding closing tag for first tag, that must be an error, record the error and return.
            if (-1 == endTagIndex) {
                this.errorAry.push([endTag, "#"]);
            }
            else {
                // If the paragraph has corresponding closing tag for first tag, it still need further confirmation, 
                // in the case many same tags embedded each other, such as [<B>, <B>, </B>, <B>, </B>, <B>, </B>].
                // In this case, there are four <B> tags, three </B> tags, it need to check which </B> is the corresponding 
                // closing tag for the most outside <B> tag.

                let idxTuple = this.confirmEndTagIndex(tagAry);
                let startTagIndex = idxTuple[0];
                endTagIndex = idxTuple[1];

                if (-1 == startTagIndex || startTagIndex > endTagIndex) {
                    // If the index of closing tag is 1, that means no tag between opening tag and closing tag.
                    if (endTagIndex == 1) {
                    }
                    // If the index of closing tag is 2, that means only one tag between opening tag and closing tag.
                    // It couldn't find tag to match it, it must be an error.
                    else if (endTagIndex == 2) {
                        let tag = tagAry[1].match(/<\/[A-Z]+>/);
                        if (tag != null) {
                            this.errorAry.push(["#", tag]);
                        }
                        else {
                            let endTagInner = this.createEndTag(tagAry[1]);
                            this.errorAry.push([endTagInner, tagAry[endTagIndex]]);
                        }
                    }
                    // If the index of closing tag bigger than 2, that means more than on tag between opening tag and closing tag.
                    // Keep recurse.
                    else if (endTagIndex > 2) {
                        let firstHalfSubTagAry = tagAry.slice(1, endTagIndex);

                        if (firstHalfSubTagAry != null && firstHalfSubTagAry.length > 0) {
                            this.tagIntigritiyCheck(firstHalfSubTagAry);
                        }
                    }

                    // No matter the closing tag index is 1, 2, or bigger than 2, the rest array after the closing tag index will be 
                    // seen as a sub array to keep recurse.
                    if (endTagIndex < tagAry.length - 1) {
                        let latterHalfSubTagAry = tagAry.slice(endTagIndex + 1);

                        if (latterHalfSubTagAry != null && latterHalfSubTagAry.length > 0) {
                            this.tagIntigritiyCheck(latterHalfSubTagAry);
                        }
                    }
                }
                else if (endTagIndex == tagAry.length - 1) {
                    this.errorAry.push(endTag, "#");
                }
            }
        }
    }

    // confirmEndTagIndex will find the real corresponding closing tag index for most outside opening tag.
    // Parameter:
    // tagAry: is an array that contain all tags in one paragraph.
    confirmEndTagIndex(tagAry) {
        let startTag = tagAry[0];
        let startTagIndex = 0;

        let endTag = this.createEndTag(startTag);
        let endTagIndex = tagAry.indexOf(endTag, 0);

        if (-1 == endTagIndex) {
            return [startTagIndex, endTagIndex];
        }

        // Try to find same tag as first tag from rest array that after first tag.
        startTagIndex = tagAry.indexOf(startTag, 1);

        // If it find the same tag from rest array, and the index of this tag is smaller than the closing tag index 
        // we found previously, that means real corresponding closing tag for first tag should be later than the index 
        // we already found.
        while (-1 != startTagIndex && startTagIndex < endTagIndex && endTagIndex < tagAry.length - 1) {

            // Find new index of corresponding closing tag from rest array that after the index we found previously.
            endTagIndex = tagAry.indexOf(endTag, endTagIndex + 1);
            if (-1 != endTagIndex)
                startTagIndex = tagAry.indexOf(startTag, startTagIndex + 1);
        }

        return [startTagIndex, endTagIndex];
    }

    // Create closing tag for opening tag.
    // Parameter:
    // startTag: onpening tag
    createEndTag(startTag) {
        let endTagName = startTag.match(/[A-Z]+/)[0];
        endTagName = "</" + endTagName + ">";

        return endTagName;
    }
}

module.exports = HtmlTagChecker;

