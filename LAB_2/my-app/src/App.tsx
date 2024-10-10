import React, { useState, useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
// import { ClickCounter } from "./hooksExercise";
import { ToggleTheme } from "./hooksExercise";
import {Favorited} from "./hooksExercise";
import { ThemeContext, themes, FavContext, heart} from "./themeContext";

function App() {

  const [FavList, SetFav] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  return (
    <ThemeContext.Provider value={currentTheme}>
    <div className='app-container'>

      <form className="note-form">
          <div><input placeholder="Note Title"></input></div>

          <div><textarea placeholder="Note Content"></textarea></div>
          
          <div>
          <select id="labeled" name="labeled" required>
            <option value="">--Please choose an option--</option>
            <option value="">Personal</option>
            <option value="">Work</option>
            <option value="">Study</option>
            <option value="">Other</option>
           </select>
           </div>

          <div><button type="submit">Create Note</button></div>
          <div><ToggleTheme t={currentTheme} TSet={setCurrentTheme}/></div>
      </form>
      
      
      <div className="notes-grid">
       {dummyNotesList.map((note) => (
        
         <div
           key={note.id}
           className="note-item"
           style={{
           background: currentTheme.background, 
           color: currentTheme.foreground, display: "flex",}}>
           <div className="notes-header">
              
              {/* Button used to change heart */}
             <Favorited title={note.title} L={FavList} LSet={SetFav}/>
             <button>x</button>
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
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
