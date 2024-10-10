// ThemeContext.ts
import React from 'react';

export const themes = {
 light: {
   foreground: '#000000',
   background: '#eeeeee',
 },
 dark: {
   foreground: '#ffffff',
   background: '#222222',
 },
};

export const ThemeContext = React.createContext(themes.light);

export const heart = {
  unliked: {
    sym: "♡"
  }, 
  liked: {
    sym: "❤️"
  },
};

export const FavContext = React.createContext(heart.unliked);
