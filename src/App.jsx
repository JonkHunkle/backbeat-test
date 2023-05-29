import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import * as Tone from 'tone'

const division = 8
let baseURL = "https://mbardin.github.io/PDM-resources/media/sound_samples";

function App() {
  const [playing, setPlaying]= useState(false)
  const [selectedBackbeat, setSelectedBackbeat]= useState('')
  const [loop, setLoop]=useState(undefined)
const drumSetRef=useRef(undefined)
const backbeatRef=useRef(undefined)
const counterRef= useRef(0)
  const drumRef= useRef({
    rock:{
      hh:[1,0,1,0,1,0,1,0],
      kd:[1,1,0,1,1,1,0,1],
      sn:[0,0,1,0,0,0,1,0]
    },
    blues:{
      hh:[1,0,0,0,1,0,1,1],
      kd:[1,0,0,0,0,0,0,1],
      sn:[0,0,0,0,1,0,0,0]
    }
  })
  
  let play = (time)=>{
    for (const instrument in drumRef.current[backbeatRef.current]){
      drumRef.current[backbeatRef.current][instrument].forEach((beat, i) => {
        console.log(beat,i)
        if(beat>0 && i===counterRef.current){
          drumSetRef.current[instrument].triggerAttackRelease('C2','32n', time,1);
        }
      })
    }
    counterRef.current = (counterRef.current +1)%division
}
  const startBeat = async(e)=>{
    e.preventDefault()
    if(backbeatRef.current!==undefined){
      if(!playing){
        await Tone.loaded()
        Tone.Transport.start();
        loop.start();
      }else{
        // Tone.Transport.stop();
        loop.stop();
        counterRef.current=0

      }
      setPlaying(!playing)
    }
  }

const selectBackbeat= (e)=>{
  e.preventDefault()
  const {value} = e.target
  backbeatRef.current=value
  loop.stop(0)
  setPlaying(false)
  }
  Tone.Transport.bpm.value=120
  Tone.Transport.timeSignature=division/16

  useEffect(()=>{
  
  if(drumSetRef.current===undefined){
    let newDrum= {}
    let hiHat= new Tone.Sampler({
      urls: { C2: `hat.mp3` },
      baseUrl:
          'https://res.cloudinary.com/dcttcffbc/video/upload/v1597045705/samples/react-sequencer/',
  }).toDestination();

    let kick= new Tone.Sampler({
      urls: { C2: '/perc/Kick01.mp3' },
      baseUrl:baseURL,
  }).toDestination();

    let snare= new Tone.Sampler({
      urls: { C2: 'snare' },
      baseUrl:'https://res.cloudinary.com/dcttcffbc/video/upload/v1597045705/samples/react-sequencer/',
  }).toDestination();

    newDrum.hh=hiHat
    newDrum.sn=snare
    newDrum.kd=kick
    drumSetRef.current=newDrum
  }

  if(loop===undefined) setLoop(new Tone.Loop(play, '16n'))

  },[])


  return (
    <div className="App">
      <div style={{display:'flex', flexDirection:'column'}}>
      <select onChange={selectBackbeat}>
        <option value='' hidden>select your beat!</option>
        <option value='rock'>rock</option>
        <option value='blues'>blues</option>
      </select>
       <button onClick={startBeat}> {!playing?'Start':'Stop'} the {selectedBackbeat} beat!</button>
       <p>{`${playing}`}</p>
      </div>
    </div>
  )
}

export default App
