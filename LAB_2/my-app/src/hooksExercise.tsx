import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes, FavContext, heart} from "./themeContext";
import { dummyNotesList } from "./constants"; 
import { Label, Note } from "./types";

// export function ClickCounter() {
//   const theme = useContext(ThemeContext);
//   const [count, setCount] = useState(0);
//   const handleClick = () => {
//     setCount(count + 1);
//   };

//   useEffect(() => {
//     document.title = `You clicked ${count} times`;
//   }, [count]);
//   return (
//      <div
//        style={{
//          background: theme.background,
//          color: theme.foreground,
//          padding: "20px",
//        }}
//      >
//        <p>You clicked {count} times </p>
//        <button
//          onClick={() => setCount(count + 1)}
//          style={{ background: theme.foreground, color: theme.background }}
//        >
//          Click me
//        </button>
//      </div>
//    );
// }

// function ThemeButton() {
//   const theme = useContext(ThemeContext);
  
  
  
//     return (
      
//   };

// Wrapper component to provide context

interface ThemeProps{
  t:{
    foreground: string;
    background: string;
  };
  TSet: React.Dispatch<React.SetStateAction<{
    foreground: string;
    background: string;
  }>>;
}

export function ToggleTheme(prop:ThemeProps) {

  const toggleTheme = () => {
    prop.TSet(prop.t === themes.light ? themes.dark : themes.light);
  };
 
  return (
    <ThemeContext.Provider value={prop.t}>
      <button type="button" onClick={toggleTheme}> Theme </button>
    </ThemeContext.Provider>
  );
 }

export default ToggleTheme;


function HeartButton() {
  const heart = useContext(FavContext);
  return (
     <div>
       <button>
         {heart.sym}
       </button>
     </div>
   );
}

interface FavProps{
  title: string;
  L: string[];
  LSet: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Favorited(favProps:FavProps) {
  const [currentTheme, setCurrentTheme] = useState(heart.unliked);
 
  const favorite = () => {
    setCurrentTheme(currentTheme === heart.unliked ? heart.liked : heart.unliked);

    if(favProps.L.includes(favProps.title)){
      favProps.LSet((prevL) => prevL.filter(i => i !== favProps.title));
    }else{
      favProps.LSet((prevL) => [...prevL, favProps.title]);
    }
  };
 
  return (
    <FavContext.Provider value={currentTheme}>
      <button onClick={favorite}> <HeartButton/> </button>
    </FavContext.Provider>
  );
}


