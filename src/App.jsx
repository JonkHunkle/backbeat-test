import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import * as Tone from 'tone'


function App() {
  const [playing, setPlaying]= useState(false)
  const [selectedBackbeat, setSelectedBackbeat]= useState('')
  const samples=[
    {
      name:'hh',
      url:'./assets/Hi-Hat-Closed-Hit.mp3'
    },
    {
      name:'kd',
      url:'./assets/Punch-Kick.mp3'
    },
    {
      name:'sn',
      url:'./assets/Snare-Drum-Hit.mp3'
    },
  ]
  const drums= {
    rock:{
      hhPattern:[1,1,1,1,1,1,1,1],
      kickPattern:[1,0,0,0,1,0,0,1],
      snarePattern:[0,0,1,0,0,0,1,0]
    },
    blues:{
      hhPattern:[1,1,1,1,1,1,1,1],
      Pattern:[1,1,1,1,1,1,1,1],
      snarePattern:[1,1,1,1,1,1,1,1]
    }
  }


  const startBeat = (e)=>{
    e.preventDefault()
    setPlaying(!playing)
    let track= new Tone.Players({
      hh:'./assets/Hi-Hat-Closed-Hit.mp3',
      kd: './assets/Punch-Kick.mp3',
      sn: './assets/Snare-Drum-Hit.mp3',
    }).toDestination()
    if(!playing){
      track.player('hh').start()
    }else{
      
    }
  }

const selectBackbeat= (e)=>{
  e.preventDefault()
  const {value} = e.target
  setPlaying(false)
  setSelectedBackbeat(value)
  }


  return (
    <div className="App">
      <div style={{display:'flex', flexDirection:'column'}}>
      <select onChange={selectBackbeat}>
        <option value='' hidden>select your beat!</option>
        <option value='rock'>rock</option>
        <option value='blues'>blues</option>
      </select>
       <button onClick={startBeat} >Start the {selectedBackbeat} beat!</button>
       <p>{`${playing}`}</p>
      </div>
    </div>
  )
}

export default App
