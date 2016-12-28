# FoxReloadBlocker



WebExtension to handle the onBeforeUnload event on Fox News Web Pages. 

This portable code should run on the Google Chrome, FireFox and Opera browsers. 
Extending to Microsoft Edge should be trivial.

This code works by installing a handler for the 
[onBeforeUnload event](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload). Returning any string from the handler causes compatibile browsers to show a dialog to the user to confirm the page should be unloaded. Declining the page unload averts the page reload (or navigation).

This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

```js
function test() {
  console.log("notice the blank line before this function?");
}
```



> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> > This is nested blockquote.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

*   This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

*   Another item in the same list.

This site was built using [GitHub Pages](https://pages.github.com/).

- George Washington
- John Adams
- Thomas Jefferson

@octocat :+1: This PR looks great - it's ready to merge! :shipit:
