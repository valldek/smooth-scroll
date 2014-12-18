smooth-scroll
=============

A simple smooth scrolling script without any framework dependency.

## How to use
1) Include **smoothScrol.js** to your page 
```html
<script src="smoothScroll.js">
```
or copy and paste smooth object into your script

2) Add smooth scrolling functionality to your links by:

adding inline event handler to your html:
```html
<a href="#some_anchor" smooth.init(event,this)>some_anchor</a>
...
<section id="some_anchor">
```
Or if you dont like inline events, you can add it from script
```html
<a href="some_anchor" id="unique-id">some_anchor</a>
```

```javascript
<script>
var link = document.getElementById('unique-id');
link.onclick = function(event){
    smooth.init(event,this);
};
</script>
```

## Options 
You can modify script behavior by changing first 3 options in smooth object:
 - duration - How long scroll effect will take in miliseconds. (default 1000 = 1s)
 - steps - how many steps during duration time, higher value more smoother effect. (default 20)
 - fixedTop - pixel value of fixed top navigation height. (default 0 - meaning no fixed top)

## Requirement
No additional requirements, scripts works without any frameworks.

