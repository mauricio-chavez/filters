import React, { Component, createRef } from 'react';

class App extends Component {

  constructor(props) {
    super(props)
    this.imageRef = createRef()
    this.state = {
      imagepath: null
    }
  }

  submitImage = event => {
    event.preventDefault();
    let imageValue = this.imageRef.current.files[0];
    let url = 'http://127.0.0.1:3000/filter';
    let data = new FormData();
    data.append('image', imageValue);
    fetch(url, {
      method: 'POST',
      body: data
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(json => {
        this.setState({ imagepath: json.filename });
      });
  }

  render() {
    let image;
    if (this.state.imagepath) {
      image = (
        <figure>
          <img src={`http://127.0.0.1:3000/image/${this.state.imagepath}`} alt="Result" />
        </figure>
      );
    } else {
      image = null;
    }

    return (
      <>
        <h1>Filtro</h1>
        <form id="form" onSubmit={this.submitImage}>
          <p>
            <label htmlFor="image_id">Imagen</label>
          </p>
          <p>
            <input type="file" ref={this.imageRef} />
          </p>
          <button type="submit">
            Enviar
          </button>
        </form>
        { image }
      </>
    );
  }
}

export default App;
