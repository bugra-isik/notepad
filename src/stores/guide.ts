export const guide = `
# Markdown Guide

Markdown is a lightweight markup language for formatting simple and readable text.

## Headings

To create a heading, add number signs (#) in front of a word or phrase. The number of number signs you use should correspond to the heading level. For example, to create a heading level three (<h3>), use three number signs (e.g., ### My Header).

\`\`\`markdown
# Heading level 1 => <h1>Heading level 1</h1>
## Heading level 2 => <h2>Heading level 2</h2>
### Heading level 3 => <h3>Heading level 3</h3>
#### Heading level 4 => <h4>Heading level 4</h4>
##### Heading level 5 => <h5>Heading level 5</h5>
###### Heading level 6 => <h6>Heading level 6</h6>
\`\`\` 

## Paragraphs

To create paragraphs, use a blank line to separate one or more lines of text.

\`\`\`markdown
I really like using Markdown.

I think I'll use it to format all of my documents from now on.

<p>I really like using Markdown.</p>

<p>I think I'll use it to format all of my documents from now on.</p>
\`\`\` 

## Line Breaks

To create a line break or new line (<br>), end a line with two or more spaces, and then type return.


\`\`\`markdown
This is the first line.  
And this is the second line.

<p>This is the first line.<br>
And this is the second line.</p>
\`\`\` 

## Emphasis

You can add emphasis by making text bold or italic


\`\`\`markdown

### Bold
I just love **bold text**.
I just love <strong>bold text</strong>.

### Italic
Italicized text is the *cat's meow*.
Italicized text is the <em>cat's meow</em>.

### Bold and Italic
This text is ***really important***.
This text is <em><strong>really important</strong></em>.

\`\`\` 

## Blockquotes

To create a blockquote, add a > in front of a paragraph.

\`\`\`markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
\`\`\`

The rendered output looks like this:

> Dorothy followed her through many of the beautiful rooms in her castle.

### Blockquotes with Multiple Paragraphs

Blockquotes can contain multiple paragraphs. Add a > on the blank lines between the paragraphs.

\`\`\`markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
\`\`\`

### Nested Blockquotes

Blockquotes can be nested. Add a >> in front of the paragraph you want to nest.

\`\`\`markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
\`\`\`

The rendered output looks like this:

> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

## Lists

You can organize items into ordered and unordered lists.

### Ordered Lists

To create an ordered list, add line items with numbers followed by periods. The numbers don’t have to be in numerical order, but the list should start with the number one.

\`\`\`markdown
1. First item
2. Second item
3. Third item
4. Fourth item
\`\`\`

Rendered Output

1. First item
2. Second item
3. Third item
4. Fourth item

---

\`\`\`markdown
1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item
\`\`\`

Rendered Output

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item

### Unordered Lists

To create an unordered list, add dashes (-), asterisks (*), or plus signs (+) in front of line items. Indent one or more items to create a nested list.

\`\`\`markdown
- First item
- Second item
- Third item
- Fourth item
\`\`\`


Rendered Output

- First item
- Second item
- Third item
- Fourth item

---

\`\`\`markdown
- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
\`\`\`

Rendered Output

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item

## Fenced Code Blocks

The basic Markdown syntax allows you to create code blocks by indenting lines by four spaces or one tab. If you find that inconvenient, try using fenced code blocks. Depending on your Markdown processor or editor, you’ll use three backticks ( \`\`\` ) or three tildes (~~~) on the lines before and after the code block. The best part? You don’t have to indent any lines!

\`\`\`markdown
    \`\`\`json
    {
    "firstName": "John",
    "lastName": "Smith",
    "age": 25
    }
    \`\`\`
\`\`\`

The rendered output looks like this:

\`\`\`json
{
    "firstName": "John",
    "lastName": "Smith",
    "age": 25
}
\`\`\`

## Horizontal Rules

To create a horizontal rule, use three or more asterisks (***), dashes (---), or underscores (___) on a line by themselves.

\`\`\`markdown
---
\`\`\`

## Links
To create a link, enclose the link text in brackets (e.g., [Duck Duck Go]) and then follow it immediately with the URL in parentheses (e.g., (https://duckduckgo.com)).

\`\`\`markdown
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).
\`\`\`



The rendered output looks like this:

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

### URLs and Email Addresses

To quickly turn a URL or email address into a link, enclose it in angle brackets.

\`\`\`markdown
<https://www.markdownguide.org>
<fake@example.com>
\`\`\`

The rendered output looks like this:

<https://www.markdownguide.org>\n
<fake@example.com>

## Escaping Characters

To display a literal character that would otherwise be used to format text in a Markdown document, add a backslash (\\) in front of the character.

\`\`\`markdown
\\* Without the backslash, this would be a bullet in an unordered list.
\`\`\`

The rendered output looks like this:

\\* Without the backslash, this would be a bullet in an unordered list.
`;
