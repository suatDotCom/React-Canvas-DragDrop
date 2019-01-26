import React, { Component } from "react";
import "../../App.css";

const _constants = {
  containerWidth: 1200,
  containerHeight: 700
};

var canvas,
  context,
  nodes = [];

export class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragStatus: false,
      offsetX: null,
      offsetY: null,
      startX: null,
      startY: null,
      mousePosition: {}
    };
  }
  componentDidMount = () => {
    //canvas init
    canvas = this.refs.canvasContainer;
    context = canvas.getContext("2d");
    this.setState({
      offsetX: canvas.getBoundingClientRect().left,
      offsetY: canvas.getBoundingClientRect().top
    });


    //circles init
    nodes.push({
      x: 270,
      y: 250,
      width: 0,
      height: 2 * Math.PI,
      radius: 40,
      fill: "#CF4400",
      isDragging: false,
      title: "A"
    });
    nodes.push({
      x: 370,
      y: 450,
      width: 0,
      height: 2 * Math.PI,
      radius: 40,
      fill: "#CF4400",
      isDragging: false,
      title: "B"
    });

    //canvas handlers
    canvas.onmousedown = this.mouseDownHandler.bind(this);
    canvas.onmouseup = this.mouseUpHandler.bind(this);
    canvas.onmousemove = this.mouseMoveHandler.bind(this);

    this.drawNode();
  };

  mouseDownHandler = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setMousePosition(e);

    this.setState({
      dragStatus: false
    });

    for (var i = 0; i < nodes.length; i++) {
      var circle = nodes[i];
      if (
        this.state.mousePosition.x > circle.x - 40 &&
        this.state.mousePosition.x < circle.x + 40 &&
        this.state.mousePosition.y > circle.y - 40 &&
        this.state.mousePosition.y < circle.y + 40
      ) {
        // if yes, set that circle isDragging=true
        this.setState({
          dragStatus: true
        });
        circle.isDragging = true;
      }
    }
    // save the current mouse position

    this.setState({
      startX: this.state.mousePosition.x,
      startY: this.state.mousePosition.y
    });
  };

  mouseUpHandler = e => {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    this.setState({
      dragStatus: false
    });
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].isDragging = false;
    }
  };

  mouseMoveHandler = e => {
    if (this.state.dragStatus) {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      this.setMousePosition(e);

      // calculate the distance the mouse has moved
      // since the last mousemove
      var dx = this.state.mousePosition.x - this.state.startX;
      var dy = this.state.mousePosition.y - this.state.startY;

      // move each rect that isDragging
      // by the distance the mouse has moved
      // since the last mousemove
      for (var i = 0; i < nodes.length; i++) {
        var circle = nodes[i];
        if (circle.isDragging) {
          circle.x += dx;
          circle.y += dy;
        }
      }

      // redraw the scene with the new rect positions
      this.drawNode();

      // reset the starting mouse position for the next mousemove
      this.setState({
        startX: this.state.mousePosition.x,
        startY: this.state.mousePosition.y
      });
    }
  };

  clearNode = () => {
    context.clearRect(
      0,
      0,
      _constants.containerWidth,
      _constants.containerHeight
    );
  };

  drawNode = () => {
    this.clearNode();
    context.fillStyle = "#A8BDC4";
    context.fillRect(
      0,
      0,
      _constants.containerWidth,
      _constants.containerHeight
    );

    // draw segment
    context.beginPath();
    context.moveTo(nodes[0].x, nodes[0].y);
    context.lineTo(nodes[1].x, nodes[1].y);
    context.lineWidth = 5;
    context.stroke();
    context.closePath();

    //draw circle
    for (var i = 0; i < nodes.length; i++) {
      var circle = nodes[i];
      this.circle(
        circle.x,
        circle.y,
        circle.radius,
        circle.width,
        circle.height,
        circle.title,
        circle.fill
      );
    }
  };

  circle = (x, y, r, w, h, title, fill) => {
    context.beginPath();
    context.arc(x, y, r, w, h);
    context.closePath();

    context.fillStyle = fill;
    context.fill();

    context.font = "700 30px Arial";
    context.fillStyle = "#222427";
    context.fillText(title, x - 10, y + 10);
  };

  setMousePosition = e => {
    var area = canvas.getBoundingClientRect();
    this.setState({
      mousePosition: {
        x: Math.round(e.x - area.left),
        y: Math.round(e.y - area.top)
      }
    });
  };

  render() {
    return (
      <canvas
        ref="canvasContainer"
        width={_constants.containerWidth}
        height={_constants.containerHeight}
      />
    );
  }
}

export default Container;
