import React from "react";
// Import your audio file
import "./App.css";

import song from "./music/chungtacuahientai.mp3";
import img from "./images/chungtacuahientai.jpeg";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";
class App extends React.Component {
  // Create state

  state = {
    // Get audio file in a variable
    audio: new Audio(song),

    // Set initial state of song
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  };
  // Main function to handle both play and pause operations
  playPause = () => {
    // Get state of song
    let isPlaying = this.state.isPlaying;

    if (isPlaying) {
      // Pause the song if it is playing
      this.state.audio.pause();
      const list = document.getElementById("music-container").classList;
      list.remove("play");
    } else {
      // Play the song if it is paused
      this.state.audio.play();
      const list = document.getElementById("music-container").classList;
      list.add("play");
    }

    // Change the state of song
    this.setState({ isPlaying: !isPlaying });
  };
  // for update progressing on music containter
  updateProgress = () => {
    const duration = this.state.audio.duration;
    const currentTime = this.state.audio.currentTime;
    //console.log(duration, currentTime);
    const progressPercentage = (currentTime / duration) * 100;
    const progress = document.getElementById("progress");
    progress.style.width = `${progressPercentage}%`;
  };
  setProgress = (e) => {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    console.log(clickX);
    const duration = this.state.audio.duration;
    this.setState({
      currentTime: (width + clickX) / duration,
    });
  };
  render() {
    return (
      <div class="music-container" id="music-container">
        <div class="music-info">
          <h4 id="title">Chung Ta Cua Hien Tai</h4>
          <div
            class="progress-container"
            id="progress-container"
            onClick={this.setProgress}
          >
            <class class="progress" id="progress"></class>
          </div>
        </div>
        <audio sr={song} id="audio" onTimeUpdate={this.updateProgress} />

        <div class="img-container">
          <img
            src={img}
            alt="Chung Ta Cua Hien Tai - Son Tung M-TP"
            id="music-cover"
          />
        </div>

        {/* Button to call our main function */}
        <div class="nav">
          <button class="action-btn" id="backward">
            <AiFillBackward />
          </button>
          <button
            class="action-btn action-bigger"
            id="play"
            onClick={this.playPause}
          >
            <p>{this.state.isPlaying ? <FaPause /> : <FaPlay />}</p>
          </button>
          <button class="action-btn" id="forward">
            <AiFillForward />
          </button>
        </div>
        {/* <audio src={song} controls={this.state.audio} /> */}
      </div>
    );
  }
}

export default App;
