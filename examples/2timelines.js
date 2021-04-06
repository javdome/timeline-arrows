      /**
      *CREATING THE TIMELINE 1
      */
      import Arrow from 'timeline-arrows';


      const options = {
        groupOrder: "content", // groupOrder can be a property name or a sorting function
        selectable: true,
        editable: true,
        groupTemplate: function(group) { //function to hide groups
          var container = document.createElement('div');
          var label = document.createElement('span');
          label.innerHTML = group.content + ' ';
          container.insertAdjacentElement('afterBegin',label);
          
          var hide = document.createElement('span');
          hide.setAttribute("class", "oi oi-eye");
          hide.addEventListener('click',function(){
            groups.update({id: group.id, visible: false});
          });
          container.insertAdjacentElement('beforeEnd',hide);     
          return container;
        }
      };

      // Generate some
      var now = vis.moment()
        .minutes(0)
        .seconds(0)
        .milliseconds(0);
      var names = ["John", "Alston", "Lee", "Grant"];
      var itemCount = 20;
      // create a data set with groups
      var groups = new vis.DataSet();
      for (var g = 0; g < names.length; g++) {
        groups.add({ id: g, content: names[g] });
      }
      // create a dataset with items
      var items = new vis.DataSet();
      for (var i = 0; i < itemCount; i++) {
        var start = now.clone().add(Math.random() * 200, "hours");
        var end = start + 100000000;
        var group = Math.floor(Math.random() * names.length);
        items.add({
          id: i,
          group: group,
          content:
            "item " +
            i +
            ' <span style="color:#97B0F8;">(' +
            names[group] +
            ")</span>",
          start: start,
          end: end,
          //type: "box"
        });
      }
      // Create visualization.
      const container = document.getElementById("visualization");
      const timelinevis = new vis.Timeline(container, items, groups, options);



      /**
      *CREATING THE TIMELINE 2
      */

     const options2 = {
      groupOrder: "content", // groupOrder can be a property name or a sorting function
      selectable: true,
      editable: true,
      groupTemplate: function(group) { //function to hide groups
        var container = document.createElement('div');
        var label = document.createElement('span');
        label.innerHTML = group.content + ' ';
        container.insertAdjacentElement('afterBegin',label);
        
        var hide = document.createElement('span');
        hide.setAttribute("class", "oi oi-eye");
        hide.addEventListener('click',function(){
          groups2.update({id: group.id, visible: false});
        });
        container.insertAdjacentElement('beforeEnd',hide);     
        return container;
      }
    };

    // Generate some
    var now2 = vis.moment()
      .minutes(0)
      .seconds(0)
      .milliseconds(0);
    var names2 = ["Juan", "Alfredo", "Luis", "David"];
    var itemCount2 = 20;
    // create a data set with groups
    var groups2 = new vis.DataSet();
    for (var g = 0; g < names2.length; g++) {
      groups2.add({ id: g, content: names2[g] });
    }
    // create a dataset with items
    var items2 = new vis.DataSet();
    for (var i = 0; i < itemCount2; i++) {
      var start = now2.clone().add(Math.random() * 200, "hours");
      var end = start + 100000000;
      var group = Math.floor(Math.random() * names2.length);
      items2.add({
        id: i,
        group: group,
        content:
          "item " +
          i +
          ' <span style="color:#97B0F8;">(' +
          names2[group] +
          ")</span>",
        start: start,
        end: end,
        //type: "box"
      });
    }
    // Create visualization.
    const container2 = document.getElementById("visualization2");
    const timelinevis2 = new vis.Timeline(container2, items2, groups2, options2);




    /* SYNCHRONIZATION OF MOVEMENT OF BOTH TIMELINES */

      timelinevis2.on('rangechange', function () {
        onrangechange2();
      });
      timelinevis.on('rangechange', function () {
        onrangechange1();
      });
      function onrangechange1() {
        var range = timelinevis.getWindow();
        timelinevis2.setWindow(range.start, range.end, {animation: false});
      }
      function onrangechange2() {
        var range = timelinevis2.getWindow();
        timelinevis.setWindow(range.start, range.end, {animation: false});
      }



      /**
      *CREATING 2 ARRAYS OF ARROWS 
      */    
      var dependency = [
        {
          id: 2,
          id_item_1: 1,
          id_item_2: 2,
          title: 'Hola'
        },
        {
          id: 5,
          id_item_1: 3,
          id_item_2: 5
        },
        {
          id: 7,
          id_item_1: 6,
          id_item_2: 7,
          title: 'Hello'
        },
        {
          id: 10,
          id_item_1: 3,
          id_item_2: 8 
        }
      ];



      var dependency2 = [
        {
          id: 2,
          id_item_1: 1,
          id_item_2: 2,
          title: 'Hola 2'
        },
        {
          id: 5,
          id_item_1: 3,
          id_item_2: 5
        },
        {
          id: 7,
          id_item_1: 6,
          id_item_2: 7,
          title: 'Hello 2'
        },
        {
          id: 10,
          id_item_1: 3,
          id_item_2: 8
        }
      ];

 
      // Create instance of Arrow for a timeline objetc and its denpedencies
      const myArrow = new Arrow(timelinevis, dependency);

      const myArrow2 = new Arrow(timelinevis2, dependency2);

      //Example of adding a new arrow (between items 15 and 16)
      myArrow.addArrow(
        {
          id: 13,
          id_item_1: 15,
          id_item_2: 16 
        }
      );


      

      /*ANOTHER FUNCTIONS (NO IMPORTANT)*/
      function showVisibleItems() {
        var a = timelinevis.getVisibleItems();
        document.getElementById("visibleItemsContainer").innerHTML = ""
        document.getElementById("visibleItemsContainer").innerHTML += a;
      };

      function showGroups (){
        groups.forEach(function(group){
          groups.update({id: group.id, visible: true});
        })
      };

      function remove () {
        myArrow.removeArrow(10);
      }
