# **Firestarter** #

A starter kit for front end development including a build system and a [style guide](http://base.iconpaper.org/guide.html) to quickly craft components.

## Technology stack ##

- [Gulp](http://gulpjs.com/) as task runner

#### Styles ####
- [SASS](http://sass-lang.com/) as CSS preprocessor
- [PostCSS](http://postcss.org/) plugins
    - [Autoprefixer](https://github.com/postcss/autoprefixer) takes care of vendor prefixes
    - [CSSnano](http://cssnano.co/) to optimize and minify CSS
    - [Responsive Type](https://github.com/seaneking/postcss-responsive-type) for automagical responsive typography
    - [Quantity Queries](https://github.com/pascalduez/postcss-quantity-queries) enabling stuffs like `li:at-most(4)` or `:between(4, 6)`
- [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) as CSS naming convention

#### Scripts ####
- [Browserify](http://browserify.org/) as JS dependencies manager
- [ESLint](http://eslint.org/) as JS linter
- [Babel](https://babeljs.io/) to use next generation javaScript, today

#### Others ####
- [Imagemin](https://github.com/imagemin/imagemin) to optimize images
- [Realfavicons](http://realfavicongenerator.net/) to generate favicons
- [Editorconfig](http://editorconfig.org/) to maintain consistent coding styles

## Getting started ##

You need to have `node` and `gulp` installed. If you have them, you just need to run this task.
```
  npm install
```
It will install nodejs dependencies then run `gulp` to generate files in public directory.

## Structure ##

```
|
|-- frontend/
|  |-- build/
|  |  |-- configs/
|  |  |-- tasks/
|  |-- favicon/
|  |  |-- favicon.png
|  |-- img/
|  |-- scss/
|  |  |-- base/
|  |  |-- components/
|  |  |-- helpers/
|  |  |-- layout/
|  |  |-- styles.scss
|  |-- js/
|  |  |-- components/ (will be concatened on top of main.js)
|  |  |-- main.js
|-- public/
|  |-- favicons/ (generated favicons)
|  |-- img/ (optimized images)
|  |-- css/
|  |  |-- styles.css
|  |-- js/
|  |  |-- scripts.js
|  |-- index.html
|
```

## Build system ##

Gulp configs and individual tasks are located in build folder. All tasks can be disabled via the config files.

This build system is including support for `sourcemaps`, `notifications` and `livereload`.

#### Bundle Tasks

Task Name     | Description
------------- | -----------------------------------------------------
`default`     | Run images, styles, scripts and clean:maps if `--prod` flag is used
`watch`       | Watch CSS and JS files
`live`        | Watch files and enable livereload (you need to have [livereload browser extension](http://livereload.com/extensions/))

#### Individual Tasks

Task Name     | Description
------------- | ----------------------------------------------------
`images`      | Copy and optimize images
`styles`      | Compile SASS and run autoprefixer (and cssnano if `--prod` flag is used)
`scripts`     | Concatene and lint JS
`favicons`    | Generate favicons for all devices
`clean:maps`  | Clean sourcemaps, used only with `--prod` flag

## SASS helpers ##

The starter kit includes SASS variables for general settings such as `font styling` `color settings` `breakpoints` and `transitions`.

#### Mixins

Name          | Description
------------- | ----------------------------------------------------
`breakpoints`    | Generate media queries in ems
`font-face`      | Generate font-face rules
`font-smoothing` | Add or remove font smoothing
`icons`          | Generate CSS animated icons ([demo on codepen](http://codepen.io/gor0n/pen/yepgpX))

#### Functions

Name          | Description
------------- | ----------------------------------------------------
`em`             | Convert pixels in ems
`rem`            | Convert pixels in rems
`strip-unit`     | Strip unit from value

#### Placeholders

Some SASS placeholders are also provided: `clearfix` `centerx` `centery` `centerxy` and `hide-text`.

## CSS components ##

The starter kit includes a [style guide](http://base.iconpaper.org/guide.html) displaying all CSS components.

All components are in `em` so you can control their sizes with the font size of their parent. Using `rem` on values that are not meant to be relative.

[Sanitize](https://10up.github.io/sanitize.css/) is included to render elements consistently.

#### Typography

Providing styling for text elements including headings. Typography element and variations can be extended on a container to provide quick typography styling.

#### Form

Providing styling for form elements with custom select boxes, radio buttons and checkboxes in CSS.

#### Buttons

Providing basic styling for buttons with `primary` `secondary` and `disabled` variations.

## Copyright ##

The MIT License (MIT) Copyright © 2016 Vivian Verswyvel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
