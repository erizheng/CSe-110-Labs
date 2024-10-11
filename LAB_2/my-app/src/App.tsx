import React, { useState, useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
// import { ClickCounter } from "./hooksExercise";
import { ToggleTheme, Favorited} from "./hooksExercise";
import { ThemeContext, themes, FavContext, heart} from "./themeContext";

function App() {

  const [FavList, SetFav] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
   id: -1,
   title: "",
   content: "",
   label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);


  return (
    <ThemeContext.Provider value={currentTheme}>
    <div className='app-container'>

      <form className="note-form" onSubmit={createNoteHandler}>
          <div><input placeholder="Note Title"
          onChange={(event) =>
          setCreateNote({ ...createNote, title: event.target.value })}
        	required></input></div>

          <div><textarea placeholder="Note Content"
          onChange={(event) =>
          setCreateNote({ ...createNote, content: event.target.value })}
        	required></textarea></div>
          
          <div>
          <select
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label})}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

          <div><button type="submit">Create Note</button></div>
          <div><ToggleTheme t={currentTheme} TSet={setCurrentTheme}/></div>
      </form>

     <div className="notes-grid">
    	{notes.map((note) => (
      	<div
        	key={note.id}
        	className="note-item"
          style={{
          background: currentTheme.background, 
          color: currentTheme.foreground, display: "flex",}}
      	>
        	<div className="notes-header">
            <Favorited title={note.title} L={FavList} LSet={SetFav}/>
          	<button
            onClick={(event) => {
              event.preventDefault();
              setNotes(notes.filter(i => i != note));
              if(FavList.includes(note.title) ){
                SetFav((prevFavList) => prevFavList.filter(j => j !== note.title));
              }
            }}>x</button>
        	</div>
        	<h2 contentEditable="true"> {note.title} </h2>
        	<p contentEditable="true"> {note.content} </p>
        	<p contentEditable="true"> {note.label} </p>
      	</div>
    	))}
  	</div>
     
    
       <div className="FavList">
          {/* Favorite List */}
          <h2>List of Favorites:</h2>
          {
          FavList.map(str => {
            return(`
              ${str}
            `)
          })
          }
          

       </div>
      

   </div>
   </ThemeContext.Provider>


 );
    
}

export default App;
