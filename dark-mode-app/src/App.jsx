import "./App.css";
import { useEffect, useState } from "react";
import { Toggle } from "./Components/Toggle/Toggle";

function App() {
  const [isDark, setIsDark] = useState(true);

  let themePreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  )?.matches;

  const body = document.body;

  if (isDark && themePreference) {
    body.setAttribute("data-theme", "dark");
    localStorage.getItem("theme");
  } else {
    body.setAttribute("data-theme", "light");
  }

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    localStorage.setItem("theme", themePreference ? "dark" : "light");
  }, [themePreference]);

  return (
    <>
      <Toggle isChecked={isDark} handleChange={toggleDarkMode} />
      <div className="container">
        <h1>{isDark ? "Dark Mode 🌑" : "Light Mode 🌞"}</h1>
      </div>
    </>
  );
}

export default App;
