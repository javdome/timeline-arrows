# Timeline-arrow

Following the issue of vis https://github.com/almende/vis/issues/1699, and thanks to the comments of @frboyer and @JimmyCheng, I have created a class to easily draw lines to connect items in the vis Timeline module.

![CapturaTime](https://user-images.githubusercontent.com/36993404/59111595-9d830600-8941-11e9-8cb8-8d7b72701a71.JPG)


## Install & initialize

1 - Download the [arrow.js file](https://github.com/javdome/timeline-arrows/blob/master/arrow.js) and load it in your html.

For instance:

```
<script src="./arrow.js"></script>
```

2 - Create your timeline as usual (see [vis-timeline docs](https://visjs.github.io/vis-timeline/docs/timeline/)).

For instance:

```
const my_timeline = new vis.Timeline(container, items, groups, options);
```


3 - Create your arrows as an array of objects. These objets must have, at least, the following properties:
* id
* id_item_1 (id of one timeline's items)
* id_item_2 (id of the other timeline's items that you want to connect with)

And optionally:
* title (insert a text and it will show a title if you hover the mouse in the arrow)

For instance:

```
var arrows_array = [
    { id: 2, id_item_1: 1, id_item_2: 2 },
    { id: 5, id_item_1: 3, id_item_2: 5, title:'Hello!!!' },
    { id: 7, id_item_1: 6, id_item_2: 7 },
    { id: 10, id_item_1: 3, id_item_2: 8, title:'I am a title!!!' }
];
```

4 - Create your Arrow instance for your timeline and your arrows.

For instance:

```
const my_Arrow = new Arrow(my_timeline, arrows_array);
```

That's it :)


## Methods

I have created the following methods:

**getArrow ( *arrow id* )**  Returns the arrow whith this arrow_id.

For instance:
```
my_Arrow.getArrow (2);
```

**addArrow ( *arrow object* )**  Inserts a new arrow.

For instance:
```
my_Arrow.addArrow ( { id: 13, id_item_1: 15, id_item_2: 16 } );
```

**removeArrow ( *arrow_Id* )**   Removes the arrows with this arrow_Id. 

For instance:
```
my_Arrow.removeArrow ( 10 );
```

**removeArrowbyItemId ( *item_Id* )**   Removes the arrows connected with Items with this item_Id. Returns an array with the id's of the removed arrows.

For instance:
```
my_Arrow.removeArrowbyItemId ( 23 );
```

## Examples

You can see some working examples here:

https://javdome.github.io/timeline-arrows/index.html
