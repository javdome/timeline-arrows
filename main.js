      /**
      *CREATING THE TIMELINE 
      */

      const options = {
        groupOrder: "content", // groupOrder can be a property name or a sorting function
        selectable: true,
        editable: true,
        onInitialDrawComplete: function() {
          myArrow.drawDependencies();
          myArrow.timeline.on("changed", () => {
            myArrow.drawDependencies();
            
          }); //NOTE: We hijack the on "changed" event to draw the arrow.
        },
        groupTemplate: function(group) { //Con esto añadimos el boton de ocultar en los grupos
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
      var now = moment()
        .minutes(0)
        .seconds(0)
        .milliseconds(0);
      var names = ["John", "Alston", "Lee", "Grant"];
      var itemCount = 20;
      // create a data set with groups
      var groups = new timeline.DataSet();
      for (var g = 0; g < names.length; g++) {
        groups.add({ id: g, content: names[g] });
      }
      // create a dataset with items
      var items = new timeline.DataSet();
      for (var i = 0; i < itemCount; i++) {
        var start = now.clone().add(Math.random() * 200, "hours");
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
          type: "box"
        });
      }
      // Create visualization.
      const container = document.getElementById("visualization");
      const timelineplus = new timeline.Timeline(container, items, groups, options);







      /**
      *CREATING THE ARROWS 
      */    

      //Dependencies array
      var dependency = [[1, 2], [3, 5], [6, 7], [3, 8]];
 
      // Create instance of Arrow for a timeline objetc and its denpedencies
      const myArrow = new Arrow(timelineplus, dependency);

      

      //Ejemplo de añadir nueva flecha (entre items 15 y 16)
      myArrow.addArrow([15,16]);



      /*OTROS FUNCIONES SIN IMPOSTANCIA*/
      function showVisibleItems() {
        var a = timelineplus.getVisibleItems();
        //console.log(a);
        document.getElementById("visibleItemsContainer").innerHTML = ""
        document.getElementById("visibleItemsContainer").innerHTML += a;
      };

      function showGroups (){
        groups.forEach(function(group){
          groups.update({id: group.id, visible: true});
        })
      };
