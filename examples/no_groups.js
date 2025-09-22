/**
*CREATING THE TIMELINE 
*/
import Arrow from '../arrow.js';

const options = {
  selectable: true,
  editable: true,
  // orientation: "top",
};

// Generate some

// create a dataset with items
const items = new vis.DataSet([
  { id: 1, content: "item 1", start: "2014-06-12", end: "2014-07-14" },
  { id: 2, content: "item 2", start: "2014-07-01", end: "2014-08-03" },
  { id: 3, content: "item 3", start: "2014-05-18", end: "2014-06-20" },
  { id: 4, content: "item 4", start: "2014-03-01", end: "2014-04-03" },
  { id: 15, content: "item 15", start: "2014-08-05", end: "2014-09-07" },
  { id: 5, content: "item 5", start: "2014-09-10", end: "2014-10-12" },
  { id: 6, content: "item 6", start: "2014-04-28", end: "2014-05-30" },
  { id: 7, content: "item 7", start: "2014-10-15", end: "2014-11-17" },
  { id: 8, content: "item 8", start: "2014-11-03", end: "2014-12-05" },
  { id: 16, content: "item 16", start: "2014-12-20", end: "2015-01-22" }
]);
// Create visualization.
const container = document.getElementById("visualization");
const timelinevis = new vis.Timeline(container, items, options);
window.timelinevis = timelinevis;
/**
*CREATING THE ARROWS 
*/
const arrowsOptions = {
  color: "#039E00"
};
const dependency = [
  { id: 2, id_item_1: 1, id_item_2: 2, title: 'Hello', direction: 0, color: '#ff0000ff', line: 1, type: 2 },
  { id: 5, id_item_1: 3, id_item_2: 5, title: 'Hi', line: 1 },
  { id: 7, id_item_1: 6, id_item_2: 7, title: 'Hola' },
  { id: 10, id_item_1: 3, id_item_2: 8 },
  { id: 13, id_item_1: 16, id_item_2: 15, title: 'I have been added', color: '#800080', direction: 3, type: 2 },
  { id: 14, id_item_1: 4, id_item_2: 2, title: 'align: center', color: '#008cffff', direction: 2, align: 'center' },

];

// Create instance of Arrow for a timeline objetc and its denpedencies
const myArrow = new Arrow(timelinevis, dependency, arrowsOptions);

/*ANOTHER FUNCTIONS (NO IMPORTANT)*/

const remove = function () {
  myArrow.removeArrow(10);
}
Window.remove = remove;