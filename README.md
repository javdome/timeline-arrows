# Timeline-arrow

Following the issue of vis https://github.com/almende/vis/issues/1699, and thanks to the comments of @frboyer and @JimmyCheng, I have created a class to easily draw lines to connect items in the vis Timeline module.

![CapturaTime](https://user-images.githubusercontent.com/36993404/59111595-9d830600-8941-11e9-8cb8-8d7b72701a71.JPG)


## Install & initialize

1 - Download the package

```bash
npm install timeline-arrows
```

2 - Import the class `Arrow` from `arrow.js` in your project


3 - Create your timeline as usual (see [vis-timeline docs](https://visjs.github.io/vis-timeline/docs/timeline/)).

For instance:

```bash
const myTimeline = new vis.Timeline(container, items, groups, options);
```


4 - Create your arrows as an array of objects. These objets must have, at least, the following properties:
* id
* id_item_1 (id of one timeline's items)
* id_item_2 (id of the other timeline's items that you want to connect with)

And optionally:
* title (insert a text and it will show a title if you hover the mouse in the arrow)

For instance:

```javascript
var arrowsSpecs = [
    { id: 2, id_item_1: 1, id_item_2: 2 },
    { id: 5, id_item_1: 3, id_item_2: 5, title:'Hello!!!' },
    { id: 7, id_item_1: 6, id_item_2: 7 },
    { id: 10, id_item_1: 3, id_item_2: 8, title:'I am a title!!!' }
];
```

5 - Create your Arrow instance for your timeline and your arrows.

For instance:

```javascript
const myArrows = new Arrow(myTimeline, arrowsSpecs);
```

That's it :)


## Options

Options can be used to customize the arrows. Options are defined as a JSON object. All options are optional.

```javascript
const options = {
    followRelationships: true,
    color: "#039E00",
    tooltipConfig: (el, title) => {
        // tooltip initialization
    },
};

const myArrows = new Arrow(myTimeline, arrowsSpecs, options);
```

**followRelationships** - defaults to false.
If true, arrows can point backwards and will follow the relationships set in the data. If false, arrows will only follow the timeline direction (left to right).

**color** - defaults to "#9c0000".
Sets the arrows color.

**strokeWidth** - defaults to 3 (px).
Sets the arrows width in pixels.

**tooltipConfig** - if arrows have a `title` property, the default behavior will add a title attribute that shows on hover. However, you might not want to use the title attribute, but instead your own tooltip configuration.
This method takes two arguments, `el` - the arrow - and `title` - the content of the `title` property set in the arrow data.

**hideWhenItemsNotVisible** - defaults to `true`.
When you zoom the timeline and both items go out of the screen. You can set if the arrow is still visible. By default, the arrow hides, but you can change it setting this option to `false`.

## Methods

I have created the following methods:

**getArrow ( *arrow id* )**  Returns the arrow whith this arrow_id.

For instance:

```javascript
myArrow.getArrow(2);
```

**getIdArrows ()** Returns the list of Id arrows

For instance:

```javascript
myArrow.getIdArrows();
```

**addArrow ( *arrow object* )**  Inserts a new arrow.

For instance:

```javascript
myArrow.addArrow({ id: 13, id_item_1: 15, id_item_2: 16 });
```

**removeArrow ( *arrow_Id* )**   Removes the arrows with this arrow_Id.

For instance:

```javascript
myArrow.removeArrow( 10 );
```

**removeItemArrows ( *item_Id* )**   Removes the arrows connected with Items with this item_Id. Returns an array with the id's of the removed arrows.

For instance:

```javascript
myArrow.removeItemArrows( 23 );
```

**removeArrowsBetweenItems (*itemId1, itemId2*)**  Removes the arrows between item 1 and item 2.

For instance:

```javascript
myArrow.removeArrowsBetweenItems( 3, 8);
```

## Examples

You can see some working examples here:

https://javdome.github.io/timeline-arrows/index.html
