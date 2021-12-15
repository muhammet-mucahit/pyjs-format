# Sourcery coding exercise

Your task, should you choose to accept it, is to reimplement the Python
`str.format` function in JavaScript, and build a React website that uses it.

The string which is passed into the method can contain literal text or
replacement fields delimited by braces `{}`. Each replacement field contains
either the numeric index of a positional argument, or the name of a keyword
argument. Returns a copy of the string where each replacement field is replaced
with the string value of the corresponding argument.

The interface of the function is:

```typescript
function format(format_string: string, ...args: any[]): string { }
```

### Example usage

```javascript
// Base case
format("abc")  // ==> "abc"

// Manual field numbering
format("Hello {0}!", "world")  // ==> "Hello world!"
format("{0} {1}!", "Hello", "world")  // ==> "Hello world!"
format("{1}, {0}", "first", "last")  // ==> "last, first"

// Automatic field numbering
format("Hello {}!", "world")  // ==> "Hello world!"
format("{} {}!", "Hello", "world")  // ==> "Hello world!"

// Named field references - if the final parameter is an object
format("Hello {name}", {"name": "world"})  // ==> "Hello world"
format("Hello {name} and {name}", {"name": "world"})  // ==> "Hello world and world"
format("{last}, {first}", {"first": "first", "last": "last"})  // ==> "last, first"

// Combine positional fields and named fields
format("{} {name} {}", "bye", "hi", {"name": "hello"})  // ==> "bye hello hi"
format("{1} {name} {0}", "Bonjour", 3.14, {"name": 100})  // ==> "3.14 100 Bonjour"
```

### Website

Build a simple React and Tailwind CSS site that allows input of the
format_string, and the field arguments, and displays the result. As the inputs
are changed, keep the result updated live.

### Notes

- You can assume that manual field numbering and automatic field numbering won't
  appear in the same `format_string`
- You don't need to cover the full spec of `str.format` just the example cases
  above

### Submission

- Zip up your project folder and send to us by email
- Please keep your solution private
