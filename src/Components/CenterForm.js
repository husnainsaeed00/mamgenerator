import React, { Component } from "react";

class CenterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "https://picsum.photos/400/300", // Placeholder URL for testing
      allMemeImgs: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      })
      .catch((error) => {
        console.error("Error fetching memes:", error);
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Logic to generate a random meme image and display it
    if (this.state.allMemeImgs.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * this.state.allMemeImgs.length
      );
      const randomMeme = this.state.allMemeImgs[randomIndex];
      this.setState({
        randomImg: randomMeme.url
      });
    }
  }

  render() {
    return (
      <main>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            className="first"
            type="text"
            placeholder="Upper Text"
            name="topText"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            className="second"
            type="text"
            placeholder="Lower Text"
            name="bottomText"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button className="button">Get a new meme image 🖼</button>
        </form>
        <div className="meme-container">
          <div className="meme">
            <img src={this.state.randomImg} alt="meme" />
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2>
          </div>
        </div>
      </main>
    );
  }
}

export default CenterForm;
