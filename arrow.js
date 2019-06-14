


class Arrow {

    constructor(svg, timeline) {
        this.svg = svg;
        this.timeline = timeline;
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
    }
  
  }