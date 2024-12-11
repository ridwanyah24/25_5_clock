import React from 'react';
import './App.css'

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerLabel: "Session",
      timeLeft: 25 * 60,
      running: false
    };
    this.audioElement = new Audio('https://www.soundjay.com/mechanical/electric-drill-01.mp3');
    this.timer = null;
  }

  handleReset = () => {
    clearInterval(this.timer);
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerLabel: "Session",
      timeLeft: 25 * 60,
      running: false
    });
  };

  handleBreakDecrement = () => {
    if(!this.state.running){
        if (this.state.breakLength > 1) {
            this.setState({ breakLength: this.state.breakLength - 1 });
        }
    }
  };

  handleBreakIncrement = () => {
    if(!this.state.running){
        if (this.state.breakLength < 60) {
            this.setState({ breakLength: this.state.breakLength + 1 });
        }
    }
  };

  handleSessionDecrement = () => {
    if(!this.state.running){
        if (this.state.sessionLength > 1) {
        this.setState((prevState) => ({
          sessionLength: prevState.sessionLength - 1,
          timeLeft: (prevState.sessionLength - 1) * 60
        }));
      }   
    }
  };

  handleSessionIncrement = () => {
    if(!this.state.running){
        if (this.state.sessionLength < 60) {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength + 1,
        timeLeft: (prevState.sessionLength + 1) * 60
      }));
    }
    }
  };

  handleStartStop = () => {
    this.setState((prevState) => ({
      running: !prevState.running
    }), () => {
      if (this.state.running) {
        this.timer = setInterval(() => {
          this.setState((prevState) => ({
            timeLeft: prevState.timeLeft === 0 ? 
              (prevState.timerLabel === "Session" ? this.state.breakLength * 60 : this.state.sessionLength * 60)
              : prevState.timeLeft - 1,
            timerLabel: prevState.timeLeft === 0 ? (prevState.timerLabel === "Session" ? "Break" : "Session") : prevState.timerLabel
          }), () => {
            if (this.state.timeLeft === 0) {
              this.audioElement.play();
            }
          });
        }, 1000);
      } else {
        clearInterval(this.timer);
      }
    });
  };

  formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  render() {
    return (
        <div className='container'>
        <span className='project-name'>25 + 5 Clock</span>
        <div className='length'> 
          <div className='breaks'>
          <p id='break-label'>Break Length</p>
          <div className='set-items'>
          <span id='break-increment' className='inc' onClick={this.handleBreakIncrement}>{String.fromCharCode(8593)}</span> 
            <span id='break-length'>{this.state.breakLength}</span>
          <span id='break-decrement' className='inc' onClick={this.handleBreakDecrement}>{String.fromCharCode(8595)}</span>
          </div>
          </div>
          <div className='breaks'>
          <p id='session-label'>Session Length</p>
          <div className='set-items'>
          <span id='session-increment' className='inc' onClick={this.handleSessionIncrement}>{String.fromCharCode(8593)}</span>
            <span id='session-length'>{this.state.sessionLength}</span>
          <span id='session-decrement' className='inc incright' onClick={this.handleSessionDecrement}>{String.fromCharCode(8595)}</span>
          </div>
          </div>
        </div>
        <div className='session-div'>
          <p id='timer-label'>{this.state.timerLabel}</p>
          <p id='time-left'>{this.formatTime(this.state.timeLeft)}</p>
        </div>
        <div className='settings'>
          <span id='start_stop' className='inc' onClick={this.handleStartStop}>{String.fromCharCode(9658)}</span>
          <audio id="beep" src="https://www.soundjay.com/mechanical/electric-drill-01.mp3" />
          <span id="reset" className='inc incright' onClick={this.handleReset}>{String.fromCharCode(8634)}</span>
        </div>
      </div>
    );
  }
}

export default PomodoroClock;
