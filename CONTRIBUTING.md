# Contributing to mljs

This document explains the general guidelines for the development of JavaScript APIs
for the machine learning algorithms.

  * [General rules](#general-rules)
  * [Standalone functions](#standalone-functions)
  * [Predictors](#predictors)
  * [Commit Guidelines](#commit-guidelines)
  * [Issues and Bugs](#issues-and-bugs)

## General rules

### Use camelCase

For consistency and because it is by far the most common style in JavaScript.  
Exception: class names must start with a capital letter.

#### Good

* xSquared
* kernelType
* maybeToPrecision

#### Bad

* x_squared
* KernelType
* maybe_To$precision

### Use understandable names

The API is the point of contact with the outside world. People who use it should understand what an
option or a function does without looking at the documentation.

#### Good

* alpha, beta, gamma, ...
* kernel, xSquared, numerator

#### Bad

* a, b, c
* k, x2, num

## Standalone functions

Functions that take some input and directly return the result should always have the following signature:

```js
function myFunction(param1, param2, ..., paramN, options = {}) { ... }
```

The `param1` to `paramN` arguments are reserved for __mandatory__ parameters. Anything else goes in an `options` object.  
The call should not fail if `options` is undefined.

To handle default options, use default parameters and object destructuring:

```js
function myFunction(options = {}) {
    const {
        option1 = 'value1',
        option2 = 'value2'
    } = options;
    ...
}
```

## Predictors

Predictors are classes which implement the following interface:

### new Predictor([options])

Creates the predictor. The constructor can take parameters or options to initialize the algorithm.  
Alternatively, if the predictor has no training phase, it can be instantiated like so: `new Predictor(features[[, labels], options])`

### predictor.train(features[[, labels], options])
If the predictor has a training phase, it is executed here.

### predictor.predict(features)

This method runs the prediction for a new set of observations.

### predictor.score()

This method is optional.
It should return a value that represents the quality of a predictor.

### predictor.toJSON()

This method should return plain JavaScript Object that enables to reload the current predictor
and that can be serialized to a JSON string using `JSON.stringify`

### Predictor.load(json)

This static method should return a new predictor instance that is ready to make predictions. The `json`
parameter is the object returned by an earlier call of `toJSON`.

## Commit Guidelines

The rules are based on the [AngularJS commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit). This leads to **more readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying place of the commit change.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## Issues and Bugs

This repository is a wrap of several modules, so if the issue is related to an specific module,
please create the issue in that repository. This will make easier and faster the solution of that.
 
Before you submit your issue search the archive, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new
features, by not reporting duplicate issues.  Providing the following information will increase the
chances of your issue being dealt with quickly:

* **Overview of the Issue** - if an error is being thrown a non-minified stack trace helps
* **Motivation for or Use Case** - explain why this is a bug for you
* **Module Version(s)** - is it a regression?
* **NodeJS Version(s) and Operating System** - is this a platform related issue?
* **Reproduce the Error** - provide a live example (using [Tonic](https://tonicdev.com/) or
  [Visualizer](https://my.cheminfo.org)) or an unambiguous set of steps.
* **Related Issues** - has a similar issue been reported before?
* **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be
  causing the problem (line of code or commit)
