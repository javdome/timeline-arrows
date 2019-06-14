class Arrow {

    constructor(svg, timeline) {
        this.svg = svg;
        this.timeline = timeline;

        this.arrowHead = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "marker"
        );
        this.arrowHeadPath = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
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
    }
  
  }