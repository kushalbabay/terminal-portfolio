import { useEffect } from "react";
import "./rainBG.scss";

var tileSize = 20;
// a higher fade factor will make the characters fade quicker
var fadeFactor = 0.05;

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

interface ColumnTypeInterface {
  x: number;
  stackHeight: number;
  stackCounter: number;
}
var columns: Array<ColumnTypeInterface> = [];
var maxStackHeight: number;

export default function RainBG() {
  useEffect(() => {
    canvas = document.getElementById("canvas")! as HTMLCanvasElement;
    canvas.height = window.innerHeight + 16;
    canvas.width = window.innerWidth + 16;

    ctx = canvas.getContext("2d")!;

    initMatrix();

    for (let iteration = 0; iteration < 120; iteration++) {
      draw();
    }

    setInterval(draw, 100);

    return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  function initMatrix() {
    maxStackHeight = Math.ceil(canvas.height / tileSize);
    for (let i = 0; i < canvas.width / tileSize; ++i) {
      var column: ColumnTypeInterface = {
        x: i * tileSize,
        stackCounter: 0,
        stackHeight: 10 + Math.random() * maxStackHeight,
      };
      columns.push(column);
    }
  }

  function draw() {
    // draw a semi transparent black rectangle on top of the scene to slowly fade older characters
    ctx.fillStyle = "rgba( 0 , 0 , 0 , " + fadeFactor + " )";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // pick a font slightly smaller than the tile size
    ctx.font = tileSize - 10 + "px monospace";
    ctx.fillStyle = "rgb( 0 , 255 , 0 )";
    for (let i = 0; i < columns.length; ++i) {
      // pick a random ascii character (change the 94 to a higher number to include more characters)
      var randomCharacter = String.fromCharCode(
        33 + Math.floor(Math.random() * 94)
      );
      ctx.fillText(
        randomCharacter,
        columns[i].x,
        columns[i].stackCounter * tileSize + tileSize
      );

      // if the stack is at its height limit, pick a new random height and reset the counter
      if (++columns[i].stackCounter >= columns[i].stackHeight) {
        columns[i].stackHeight = 10 + Math.random() * maxStackHeight;
        columns[i].stackCounter = 0;
      }
    }
  }

  return (
    <canvas
      className="canvas"
      id="canvas"
      style={{ display: "block", margin: "0 auto" }}
    ></canvas>
  );
}
