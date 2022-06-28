class BoardComponent extends React.Component {
  constructor(props) {
    createCanvas(640, 480);
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      status: "",
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.checkStatus(), 1000);
    this.timerID = setInterval(() => this.draw(), 1000);
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

  draw() {
    if (mouseIsPressed === true) {
      fill(0, 0, 0);
      ellipse(mouseX, mouseY, 20, 20);
    }
    if (mouseIsPressed === false) {
      fill(255, 255, 255);
    }
  }

  render() {
    const { error, isLoaded, status } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>The server status is:</h1>
          <p>{status}</p>
        </div>
      );
    }
  }
}

ReactDOM.render(<BoardComponent />, document.getElementById("board"));
