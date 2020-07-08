import React, { useState } from "react";
import axios from "axios";
import qs from "querystring";

function CreateArea(props) {
  const [note, setNote]=useState({
    title:"",
    content:""
  })

  function manageChange(event){
    const name=event.target.name;
    const value=event.target.value;
     setNote((prevValue) => {
       return{
       ...prevValue,
       [name]:value}
     })
  }
  
  function handleClick(event){
    props.func(note)
    console.log(note);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };  
    axios.post("http://localhost:5000/",qs.stringify(note), {
      headers: headers
    })
      .then(res => console.log(res.data))
    setNote({title:"",content:""})
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input name="title" placeholder="Title" autocomple="off" onChange={manageChange}  value={note.title} />
        <textarea name="content" placeholder="Take a note..." rows="3" onChange={manageChange} value={note.content} />
        <button onClick={handleClick}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
