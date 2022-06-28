class BoardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
        error: null,
        isLoaded: false,
        status: ""
    };
  }

  Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(screen.width - 60, screen.height - 200);
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
    this.timerID = setInterval(
        () => this.checkStatus(),
        5000
    );
  }

  checkStatus() {
    fetch("/status")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            status: result.status,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, status } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return( 
            <div ref={this.myRef} id="canvas"></div>
        )
    }
  }
}

ReactDOM.render(<BoardComponent />, document.getElementById("board"));
