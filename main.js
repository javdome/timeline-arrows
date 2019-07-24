      /**
      *CREATING THE TIMELINE 
      */

      const options = {
        groupOrder: "content", // groupOrder can be a property name or a sorting function
        selectable: true,
        editable: true,
        /*
        onInitialDrawComplete: function() {
          //myArrow.drawDependencies();
          //myArrow.timeline.on("changed", () => {
            //myArrow.drawDependencies();
            
          //}); //NOTE: We hijack the on "changed" event to draw the arrow.
        },
        */
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
      const timelineplus = new timeline.Timeline(container, items, groups, options);



      console.log(timelineplus);



      /**
      *CREATING THE ARROWS 
      */    

      /**
       * dependency quiero que sea un array de objetos:
       *  {
       *    id,
       *    id_item_1,
       *    id_item_2,
       *    descripcion   
       *  }
       */
      var dependency = [
        {
          id: 2,
          id_item_1: 1,
          id_item_2: 2,
          descripcion: 'Hola Rafa'   
        },
        {
          id: 5,
          id_item_1: 3,
          id_item_2: 5,
          descripcion: 'Hola Rafa'   
        },
        {
          id: 7,
          id_item_1: 6,
          id_item_2: 7,
          descripcion: 'Hola Rafa'   
        },
        {
          id: 10,
          id_item_1: 3,
          id_item_2: 8,
          descripcion: 'Hola Rafa'   
        }
      ];



 
      // Create instance of Arrow for a timeline objetc and its denpedencies
      const myArrow = new Arrow(timelineplus, dependency);

      

      //Ejemplo de añadir nueva flecha (entre items 15 y 16)
      //myArrow.addArrow([15,16]);
      myArrow.addArrow(
        {
          id: 13,
          id_item_1: 15,
          id_item_2: 16,
          descripcion: 'Hola Rafa'   
        }
      );


      

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

      function elimina () {
        myArrow.removeArrow(10);
      }
