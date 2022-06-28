class BoardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();    
  }

  Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(screen.width-60, screen.height-200);
    };

    p.draw = () => {
      if (p.mouseIsPressed === true) {
        p.fill(0, 0, 0);
        p.ellipse(p.mouseX, p.mouseY, 20, 20);
      }
      if (p.mouseIsPressed === false) {
        p.fill(255, 255, 255);
      }
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);        
  }


  render() {
    
      return (
        
        <div ref={this.myRef}></div>
        
      );
      }
  
}

ReactDOM.render(<BoardComponent />, document.getElementById("board"));
