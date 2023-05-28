import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import * as Tone from 'tone'

const division = 8
let baseURL = "https://mbardin.github.io/PDM-resources/media/sound_samples";

function App() {
  const [playing, setPlaying]= useState(false)
  const [selectedBackbeat, setSelectedBackbeat]= useState('')
  const [tracks, setTracks] = useState(undefined)
  const [loop, setLoop]=useState(undefined)
  const [transport, setTransport]=useState(undefined)
  const [drumSet, setDrumSet] = useState(undefined)
  const [snare, setSnare]= useState(undefined)
  const [hiHat, setHiHat]= useState(undefined)
  const [kick, setKick]= useState(undefined)
const drumSetRef=useRef(undefined)
const backbeatRef=useRef(undefined)
const counterRef= useRef(0)
  const drumRef= useRef({
    rock:{
      hh:[1,0,1,0,1,0,1,0],
      kd:[1,0,0,0,1,0,0,1],
      sn:[0,0,1,0,0,0,1,0]
    },
    blues:{
      hh:[1,0,0,0,1,0,0,1],
      kd:[1,0,0,0,0,0,0,0],
      sn:[0,0,0,0,1,0,0,0]
    }
  })
  
  const playSong= (time)=>{
      counterRef.current = (counterRef.current +1)%division
      playInstrument(time)
  }

  let playInstrument = (time)=>{

      for (const instrument in drumRef.current[backbeatRef.current]){
        drumRef.current[backbeatRef.current][instrument].forEach((beat, i) => {
          if(beat>0 && i===counterRef.current){
            drumSetRef.current[instrument].triggerAttackRelease('C2','16n', time,1);
          }
        })
}
}
  const startBeat = async(e)=>{
    e.preventDefault()
    if(backbeatRef.current!==undefined){
      if(!playing){
        await Tone.loaded()
        Tone.Transport.start();
        loop.start(0);
      }else{
        loop.stop();
      }
      setPlaying(!playing)
    }
  }

const selectBackbeat= (e)=>{
  e.preventDefault()
  const {value} = e.target
  backbeatRef.current=value
  loop.stop()
  setPlaying(false)
  }
  Tone.Transport.bpm.value=120
  Tone.Transport.timeSignature=division/16

  useEffect(()=>{
  
  if(drumSet===undefined){
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

  if(loop===undefined) setLoop(new Tone.Loop(playSong, '16n'))

  },[])


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
