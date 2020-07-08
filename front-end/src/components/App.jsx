import React,{useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import qs from "querystring";


function App() {
  const [noteCollection, setNoteCollection]=useState([]);


  function addNote(newNote){
   setNoteCollection((prevValue) => {
     return [...prevValue,newNote]
   })
  }

  function noteDelete(noteId){
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };  
    axios.post("http://localhost:5000/delete",qs.stringify(noteId), {
      headers: headers
    })
      .then(res => console.log(res.data))
  }

  axios.get("http://localhost:5000/")
    .then(res => {
      // console.log(res.data);
      setNoteCollection(res.data);
    });

  return (
    <div>
      <Header />
      <CreateArea func={addNote}/>
      {noteCollection.map((note,index)=>{
        return <Note 
        key={index} 
        id={note.id}
        title={note.title} 
        content={note.content} 
        func={noteDelete}
        />
      })}
      
      <Footer />
    </div>
  );
}

export default App;
