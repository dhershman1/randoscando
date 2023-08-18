# Changelog

## v1.0.1

### Fixed

- Incorrect usage on the README

## v1.0.0

### Breaking Changes

- Renamed `letter` to `englishLetter` since this is all it supports for now
- Complete re write of the way the module works
  - Importing is now `import * as random from 'randoscando'`
  - You can also pull only the needed functions like so: `import { int, step } from 'randoscando'`
  - This also applies to how commonjs requires works
    - `const random = require('randoscando')`
    - `const { int, step } = require('randoscando')`
- Upgraded `weighted` functionality to be `Weighted Distribution` instead of `Specific Probability`
  - This should fix issues with 50/50 weights and the like
  - This also affects the output of `uniform`

### New

- Added commonjs and iife support
- The module can now be imported in pieces more properly
- Updated README with new changes
- Added new `bool` function, which gives a 50/50 chance for either `true` or `false`

### Chore

- Dependency updates
- Added build process

## v0.1.0

- Initial Release
