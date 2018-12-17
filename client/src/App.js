import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.getVideo = this.getVideo.bind(this)
    this.paintToCanvas = this.paintToCanvas.bind(this)
  }


  componentDidMount() {
    this.videoRef.addEventListener('canplay', this.paintToCanvas);
    this.getVideo()
  }

  componentWillUnmount() {
    this.videoRef.removeEventListener('canplay', this.paintToCanvas);
  }

  paintToCanvas() {
    const width = this.videoRef.videoWidth;
    const height = this.videoRef.videoHeight;
    this.canvasRef.width = width;
    this.canvasRef.height = height;
    const ctx = this.canvasRef.getContext('2d')

    return setInterval(() => {
      ctx.drawImage(this.videoRef, 0, 0, width, height);
      // take the pixels out
      let pixels = ctx.getImageData(0, 0, width, height);
      // mess with them
      // pixels = redEffect(pixels);

      pixels = this.rgbSplit(pixels);
      // ctx.globalAlpha = 0.8;

      // pixels = greenScreen(pixels);
      // put them back
      ctx.putImageData(pixels, 0, 0);
    }, 16);
  }

   rgbSplit = (pixels) => {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i - 150] = pixels.data[i + 0]; // RED
      pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
  }

  getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
//  DEPRECIATION :
//       The following has been depreceated by major browsers as of Chrome and Firefox.
//       video.src = window.URL.createObjectURL(localMediaStream);
//       Please refer to these:
//       Depreceated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
//       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject

      this.videoRef.srcObject = localMediaStream;
      this.videoRef.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <canvas ref={ref => this.canvasRef = ref}></canvas>
        <video ref={ref => this.videoRef = ref} />
      </div>
    );
  }
}

export default App;
