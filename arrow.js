class Arrow {

    constructor(timeline, dependencies) {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.timeline = timeline;

        this.arrowHead = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "marker"
        );
        this.arrowHeadPath = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        
        this.dependency = dependencies;

        this.dependencyPath = [];

        this.initialize();
    }
  
    initialize() {
        //Configures the SVG layer and add it to timeline
        this.svg.style.position = "absolute";
        this.svg.style.top = "0px";
        this.svg.style.height = "100%";
        this.svg.style.width = "100%";
        this.svg.style.display = "block";
        this.svg.style.zIndex = "1"; // Should it be above or below? (1 for above, -1 for below)
        this.svg.style.pointerEvents = "none"; // To click through, if we decide to put it above other elements.
        this.timeline.dom.center.appendChild(this.svg);

        //Configure the arrowHead
        this.arrowHead.setAttribute("id", "arrowhead0");
        this.arrowHead.setAttribute("viewBox", "-10 -5 10 10");
        this.arrowHead.setAttribute("refX", "-7");
        this.arrowHead.setAttribute("refY", "0");
        this.arrowHead.setAttribute("markerUnits", "strokeWidth");
        this.arrowHead.setAttribute("markerWidth", "3");
        this.arrowHead.setAttribute("markerHeight", "3");
        this.arrowHead.setAttribute("orient", "auto");
        //Configure the path of the arrowHead (arrowHeadPath)
        this.arrowHeadPath.setAttribute("d", "M 0 0 L -10 -5 L -7.5 0 L -10 5 z");
        this.arrowHeadPath.style.fill = "#F00";
        this.arrowHead.appendChild(this.arrowHeadPath);
        this.svg.appendChild(this.arrowHead);
        //Create paths for the started dependency array
        for (let i = 0; i < this.dependency.length; i++) {
            this.createPath();
        }
    }
    
    createPath(){
        //Add a new path to array dependencyPath and to svg
        let somePath = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          somePath.setAttribute("d", "M 0 0");
          somePath.style.stroke = "#F00";
          somePath.style.strokeWidth = "3px";
          somePath.style.fill = "none";
          this.dependencyPath.push(somePath);
          this.svg.appendChild(somePath);
    }

    

    drawDependencies() {
        //Create paths for the started dependency array
        for (let i = 0; i < this.dependency.length; i++) {
            this.drawArrows(...this.dependency[i], i);
        }
        /*
        this.dependency.map(function(dep, index) {
           this.drawArrows(...dep, index);
        });
        */
    }

    drawArrows(i, j, index) {
        //Checks if both items exist
        if( (typeof timelineplus.itemsData._data[i] !== "undefined") && (typeof timelineplus.itemsData._data[j] !== "undefined") ) {
            var bothItemsExist = true;
        } else {
            var bothItemsExist = false;
        }
        
        //Checks if at least one item is visible in screen
        var oneItemVisible = false; //Iniciamos a false
        if (bothItemsExist) {    
            var visibleItems = this.timeline.getVisibleItems();
            for (let k = 0; k < visibleItems.length ; k++) {
                if (i == visibleItems[k]) oneItemVisible = true;
                if (j == visibleItems[k]) oneItemVisible = true;
            }
        
            //Checks if the groups of items are both visible
            var groupOf_i_isVisible = false; //Iniciamos a false
            var groupOf_j_isVisible = false; //Iniciamos a false
            
            let groupOf_i = this.timeline.itemsData._data[i].group; //let groupOf_i = items.get(i).group;
            
            let groupOf_j = this.timeline.itemsData._data[j].group; //let groupOf_j = items.get(j).group;
            
            if ( this.timeline.groupsData._data._data[groupOf_i].hasOwnProperty('visible') ) {
                var groupOf_i_isVisible = this.timeline.groupsData._data._data[groupOf_i].visible;
            } else {
                var groupOf_i_isVisible = true;
            }

            if ( this.timeline.groupsData._data._data[groupOf_j].hasOwnProperty('visible') ) {
                var groupOf_j_isVisible = this.timeline.groupsData._data._data[groupOf_j].visible;
            } else {
                var groupOf_j_isVisible = true;
            }
        }

        if ( (groupOf_i_isVisible && groupOf_j_isVisible) && (oneItemVisible) && (bothItemsExist)) {
            var item_i = this.getItemPos(this.timeline.itemSet.items[i]);
            var item_j = this.getItemPos(this.timeline.itemSet.items[j]);
            if (item_j.mid_x < item_i.mid_x) [item_i, item_j] = [item_j, item_i]; // As demo, we put an arrow between item 0 and item1, from the one that is more on left to the one more on right.
            var curveLen = item_i.height * 2; // Length of straight Bezier segment out of the item.
            item_j.left -= 10; // Space for the arrowhead.
            this.dependencyPath[index].setAttribute("marker-end", "url(#arrowhead0)");
            this.dependencyPath[index].setAttribute(
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
            this.dependencyPath[index].setAttribute("marker-end", "");
            this.dependencyPath[index].setAttribute("d", "M 0 0");
        }

    }

    addArrow (dep) {
        this.dependency.push(dep);
        this.createPath();
    }

    //Función que recibe in Item y devuelve la posición en pantalla del item.
    getItemPos (item) {
        let left_x = item.left;
        let top_y = item.parent.top + item.parent.height - item.top - item.height;
        return {
            left: left_x,
            top: top_y,
            right: left_x + item.width,
            bottom: top_y + item.height,
            mid_x: left_x + item.width / 2,
            mid_y: top_y + item.height / 2,
            width: item.width,
            height: item.height
        }
    }
  
  }