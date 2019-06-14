      /**
      *CREATING THE TIMELINE 
      */

      const options = {
        groupOrder: "content", // groupOrder can be a property name or a sorting function
        selectable: true,
        editable: true,
        onInitialDrawComplete: function() {
          drawDependencies(dependency);
          timelineplus.on("changed", () => {
            drawDependencies(dependency);
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


      //Función que recibe in Item y devuelve la posición en pantalla del item.
      const getItemPos = function(item) {
      left_x = item.left;
      top_y = item.parent.top + item.parent.height - item.top - item.height;
      return {
        left: left_x,
        top: top_y,
        right: left_x + item.width,
        bottom: top_y + item.height,
        mid_x: left_x + item.width / 2,
        mid_y: top_y + item.height / 2,
        width: item.width,
        height: item.height
      };
      };

      const drawArrows = function(i, j, index) {
        //Checks if at least one item is visible in screen
        var visibleItems = timelineplus.getVisibleItems();
        var oneItemVisible = false;
        for (let k = 0; k < visibleItems.length ; k++) {
          if (i == visibleItems[k]) oneItemVisible = true;
          if (j == visibleItems[k]) oneItemVisible = true;
        }

        //Checks if the groups of items are both visible
        let groupOf_i = items.get(i).group;
        let groupOf_j = items.get(j).group;
        
        if ( groups._data[groupOf_i].hasOwnProperty('visible') ) {
            groupOf_i_isVisible = groups._data[groupOf_i].visible;
        } else {
            groupOf_i_isVisible = true;
        }

        if ( groups._data[groupOf_j].hasOwnProperty('visible') ) {
            groupOf_j_isVisible = groups._data[groupOf_j].visible;
        } else {
            groupOf_j_isVisible = true;
        }

        if ( (groupOf_i_isVisible && groupOf_j_isVisible) && (oneItemVisible) ) {
            var item_i = getItemPos(timelineplus.itemSet.items[i]);
            var item_j = getItemPos(timelineplus.itemSet.items[j]);
            if (item_j.mid_x < item_i.mid_x) [item_i, item_j] = [item_j, item_i]; // As demo, we put an arrow between item 0 and item1, from the one that is more on left to the one more on right.
            var curveLen = item_i.height * 2; // Length of straight Bezier segment out of the item.
            item_j.left -= 10; // Space for the arrowhead.
            dependencyPath[index].setAttribute(
            "d",
            "M " +
                item_i.right +
                " " +
                item_i.mid_y +
                " C " +
                (item_i.right + curveLen) +
                " " +
                item_i.mid_y +
                " " +
                (item_j.left - curveLen) +
                " " +
                item_j.mid_y +
                " " +
                item_j.left +
                " " +
                item_j.mid_y
            );
        } else {
            dependencyPath[index].setAttribute("d", "M 0 0");
        }

      };

      const dependency = [[1, 2], [3, 5], [6, 7], [3, 8]];
      /*
      const drawDependencies = dependency => {
        dependency.map((dep, index) => drawArrows(...dep, index));
      };
      */
     const drawDependencies = function(dependency) {
      dependency.map(function(dep, index) {
         drawArrows(...dep, index)
        });
      };








      // Create SVG layer on top of timeline "center" div.
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const myArrow = new Arrow(svg, timelineplus);
      myArrow.initialize();
      


      // Add empty path (for now); it will be dynamically modified.
      const dependencyPath = [];
      //Aqui añadimos todas las flechas al DOM, pero de momento, todas tienen un "tamaño" de 0 (ver linea: somePath.setAttribute("d", "M 0 0");)
      //Es decir, habra que para "pintarlas" hay que cambiar ese atributo.
      //Ademas de al DOM, todos los elementos "flecha" tb se meten en el array dependencyPath.
      for (let i = 0; i < dependency.length; i++) {
        const somePath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        somePath.setAttribute("d", "M 0 0");
        somePath.setAttribute("marker-end", "url(#arrowhead0)");
        somePath.style.stroke = "#F00";
        somePath.style.strokeWidth = "3px";
        somePath.style.fill = "none";
        dependencyPath.push(somePath);
        svg.appendChild(somePath);
      }













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
