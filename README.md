# Many-components-ember

This app was built with Ember CLI 0.2.5.


## Overview / disclaimer

This demo compares Ember and React when adding, changing, and removing a lot of elements on a single
page. This is a synthetic benchmark that does something no real application will ever do. The
purpose of this demo is to understand the reasons for one library showing more overhead than the
other when using idiomatic approaches to building applications with each respective library.


## How it works

The demo page has three sections, each one using a different Ember view to perform the same thing.
When you click on "Add Many Items", 1000 more elements will be added to the page. You can change the
color and the width of any element. Clicking on "Remove" will remove that element from the page.
Clicking on "Remove All Items" will clear the page.

The section "Ember + Ember Data" uses `templates/ember.hbs` and Ember Data for storage.

"Ember" uses the same template but has a simple array as its model.

"React" uses `templates/react.hbs` to create a div which it then gives to React which will then
perform all of the rendering and event handling in it. This is basically an embedded version of the
original [React demo](http://binarymuse.github.io/react-primer/build/index.html?6).


## What is shows

When you have 1000 elements on the page, you can see how changing an element's width or removing
items becomes noticeably sluggish.

The table on the right side of the page should help you understand the relative performances between
the different sections. Whenever you remove a single item, add many items, or remove all items, the
table will show the time it took to perform those operations. By repeating those operations first
with "Ember + Ember Data", then "Ember", and finally "React", you'll get a rough picture of the
different performance characteristics each of them has.

Moreover, this demo also showcases the difference in performance between Ember 1.12.0 and Ember
Canary. Check out the following pages to see a prebuilt version of each:

  * http://alexeisholik.com/ember-react-demo/canary/
  * http://alexeisholik.com/ember-react-demo/1.12.0/


## Feedback

I have started a thread called "Synthetic benchmark: comparing Ember 1.12.0, Ember Canary, and
React" on  Ember's discourse. Hoping to get knowledgeable people to share their insights into what
is responsible for the overhead when doing a particular operation and if there's a way to mitigate
it.
