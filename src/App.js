import { Container } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import Definitions from './component/Definitions/Definitions';
import Header from './component/Header/Header';

function App() {
  // State for all data from api
  const [meanings, setMeanings] = useState([]);
  // State for word entry
  const [word, setWord] = useState("");
  // State for category selected with default value english
  const [category, setCategory] = useState('en');
  // State for light mode
  const [lightMode, setLightMode] = useState(false)

  // Darkmode Switch
  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  // Import Api from https://dictionaryapi.dev/
  const dictionaryApi = async () => {
    try{
      // Get data from api
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`)
      console.log(data);
      // Set data to state meanings
      setMeanings(data.data);
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    dictionaryApi();
  }, [word, category])

  return (
    <div className="App" style={{height:'100vh', backgroundColor: lightMode ? '#fff' : '#282c34', color: lightMode ? 'black' : 'white', transition: "all 0.5s linear"}}>
      <Container maxWidth="md" style={{display:"flex", flexDirection: "column", height:"100vh", justifyContent:"space-evenly"}}>
        {/* Switch */}
        <div style={{position: "absolute", top:0, right: 15, paddingTop: 10}}>
          <span>{lightMode ? "Dark" : "Light"} Mode</span>
          <DarkMode checked={lightMode} onChange={() => setLightMode(!lightMode)}/>
        </div>
        
        {/* Component Header */}
        <Header category={category} setCategory={setCategory} word={word} setWord={setWord} lightMode={lightMode}/>
        {/* Component Definition */}
        {
          meanings && (
            <Definitions word={word} meanings={meanings} category={category} lightMode={lightMode} />
          )
        }
      </Container>
    </div>
  );
}

export default App;
