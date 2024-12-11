import logo from './logo.svg';
import './App.css';
import React from 'react';


class Clock extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      break: 5,
      session: 25,
      sesTimer: 25,
      brTimer: 5,
      time: `${25}:00`,
      timeLabel: "Session",
      incr : true,
      sessionSeconds: 0,
      breakSeconds: 0
    }

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.reset = this.reset.bind(this)
    this.play =this.play.bind(this)
  }

  updateTime(session){
    const minutes = session < 10 ? '0' + session : session;
    this.setState({
      time: `${minutes}:00`
    })
  }

  increment(id){
    if (this.state.incr){
    const breaks = /break/.test(id)
    const sessions = /session/.test(id)
    if(breaks){
      this.setState((prev)=>({
        break: prev.break + 1,
      }))
    } else if(sessions){
      this.setState((prev)=>({
        session: prev.session + 1
      }))
      this.updateTime(this.state.session + 1)
    }
    if(this.state.break >= 60){
      this.setState({
        break: 60
      })
    }
    if(this.state.session >= 60){
      this.setState({
        session: 60,
        time: "60:00"
      })
    }
    }
  }

  decrement(id){
    if(this.state.incr){
    const breaks = /break/.test(id)
    const sessions = /session/.test(id)
    if(breaks){
      this.setState((prev)=>({
        break: prev.break - 1,
      }))
    } else if(sessions){
      this.setState((prev)=>({
        session: prev.session - 1
      }))
      this.updateTime(this.state.session -1)
    }
    if(this.state.break <= 1){
      this.setState({
        break: 1
      })
    }
    if(this.state.session <= 1){
      this.setState({
        session: 1,
        time: "01:00"
      })
    }
    }
  }

  reset(){
    clearInterval(this.state.countdown); 
    this.setState({
      break: 5,
      session: 25,
      time: "25:00",
      timeLabel: "Session",
      incr: true,
      countdown: null
    });
  }

  play(){
    this.setState((prev)=>({
      incr: !prev.incr,
      sessionSeconds : prev.session * 60,
      breakSeconds : prev.break * 60
    }))

    if(this.state.countdown){
      clearInterval(this.state.countdown)
      this.setState({countdown:null})
      return;
    }

    if(this.state.timeLabel === 'Break' && this.state.breakSeconds === 0){
      this.setState((prev)=>({
        timeLabel: "Session",
        sessionSeconds: prev.session * 60,
        breakSeconds: prev.break * 60
      }))
    }

    let countdown = setInterval(() => {
      if(this.state.sessionSeconds > 0){
        this.setState((prev)=>({
          sessionSeconds: prev.sessionSeconds -1,
          time: this.formatTime(prev.sessionSeconds -1)
        }))
      } else{
        if(this.breakSeconds > 0){
          this.setState((prev)=>({
            breakSeconds: prev.breakSeconds -1,
            time: this.formatTime(prev.breakSeconds - 1), timeLabel: "Break"
          }))
        } else {
          this.setState((prev)=>({
            sessionSeconds: prev.session * 60,
            time: this.formatTime(prev.sessionSeconds -1), timeLabel: "Session"
          }))
        }
      } 
    }, 1000);
    this.setState({countdown})
  }

  formatTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0": ""}${remainingSeconds}`
  }

  render(){

    return( 
    <div className='container'>
      <span className='project-name'>25 + 5 Clock</span>
      <div className='length'> 
        <div className='breaks'>
        <p id='break-label'>Break Length</p>
        <div className='set-items'>
        <span id='break-increment' className='inc' onClick={()=>this.increment('break-increment')}>{String.fromCharCode(8593)}</span> 
          <span id='break-length'>{this.state.break}</span>
        <span id='break-decrement' className='inc' onClick={()=> this.decrement('breaks')}>{String.fromCharCode(8595)}</span>
        </div>
        </div>
        <div className='breaks'>
        <p id='session-label'>Session Length</p>
        <div className='set-items'>
        <span id='session-increment' className='inc' onClick={()=>this.increment('session')}>{String.fromCharCode(8593)}</span>
          <span id='session-length'>{this.state.session}</span>
        <span id='session-decrement' className='inc incright' onClick={()=> this.decrement('session')}>{String.fromCharCode(8595)}</span>
        </div>
        </div>
      </div>
      <div className='session-div'>
        <p id='timer-label'>{this.state.timeLabel}</p>
        <p id='time-left'>{this.state.time}</p>
      </div>
      <div className='settings'>
        <span id='start_stop' className='inc' onClick={this.play}>{String.fromCharCode(9658)}</span>
        <span id="reset" className='inc incright' onClick={this.reset}>{String.fromCharCode(8634)}</span>
      </div>
    </div>
    )
  }
}

export default Clock;
