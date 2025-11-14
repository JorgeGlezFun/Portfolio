import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [modo, setModo] = useState(false);

  const toggleModo = () => setModo(prev => !prev);

  return (
    <ThemeContext.Provider value={{ modo, toggleModo }}>
      {children}
    </ThemeContext.Provider>
  );
}
