# Randoscando

<p align=center>
  <a href="./LICENSE">
    <img
      alt="license:mit"
      src="https://img.shields.io/badge/license-mit-green.svg?style=flat-square"
    />
  </a>
  <a href="https://randoscando.dusty.codes/">
    <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/5a3850ce-7b82-490e-90b0-86a9e70a3e5e/deploy-status">
  </a>
  <a href="https://www.npmjs.com/package/randoscando">
    <img alt="Npm Version" src="https://img.shields.io/npm/v/randoscando.svg?style=flat-square">
  </a>
  <a href="https://github.com/dhershman1/randoscando/actions/workflows/randoscando.yml">
    <img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/dhershman1/randoscando/randoscando.yml?style=flat-square">
  </a>
</p>
<br />
<p align=center>
  <a href="https://github.com/standard/standard">
    <img alt="Standard JS" src="https://cdn.rawgit.com/standard/standard/master/badge.svg">
  </a>
</p>

A simple library for seed based predictable randomness.

> The Randoest of the Scandoest

Randoscando follows a generator style setup for its randomness allowing it to describe _how_ to generate a random value, you will be able to map random functions together via map, and manually move randomness forward using step like functions

## Install

```cli
npm i randoscando
```

## How To

### Standard ESM module

```js
import * as random from 'randoscando'
// or
import { int, step } from 'randoscando'
```

### CommonJS

```js
const random = require('randoscando')
// or
const { int, step } = require('randoscando')
```

### CDN
> **Note:** It is highly recommended to replace `@latest` with a strict version!

```html
<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/randoscando@latest/dist/randoscando.iife.min.js"></script>
<!-- unpkg -->
<script src="https://unpkg.com/randoscando@latest/dist/randoscando.iife.min.js"></script>
```


## Usage

The documentation will show you what each random function is capable of doing however in order to sequence these you need to use the `step` function

Using `step` allows you to move the randomness and its seed forward

In the example below the response is `[90, 0.8986478650476784]` where `90` is the random integer generated using the `'abc123'` seed, and `0.8986478650476784` is the next seed in the sequence. Float numbers like this will always be the type of seeds returned from `randoscando` however when you call step, you can give it any kind of `String` or `Number` you'd like.

### Example

```js
import { step, int } from 'randoscando'

step(int(1, 100), 'abc123') // => [90, 0.8986478650476784]
```

### Using Functions By Themselves
You can for sure use randoscandos functions without using `step` you just need to treat them as a simple generator


#### Example

```js
import { int, initialSeed } from 'randoscando'

int(1, 100) // => { value: 100, step: function (seed) {} }

const seed = initialSeed('abc123')
const int = int(1, 100)

int.step(seed) // => [90, 0.8986478650476784]
```

The main thing `step` does is advance the randomness forward and help keep track of providing a new seed without the need of you creating a new alea seed everytime

## Why?

I built RandoScando to mess around with seed based randomness and the algorithm behind it, just as a fun little project.

As for the name it came from a variable one of my good friends and coworkers used in one of our projects, so that it may live on forever.

## Feedback

Please feel free to provide any and all feedback whether it involves better documentation, function ideas, or better ideas of how to handle functionality.
