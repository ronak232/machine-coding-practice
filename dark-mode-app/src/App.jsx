import "./App.css";
import { useEffect, useState } from "react";
import { Toggle } from "./Components/Toggle/Toggle";

function App() {
  const [isDark, setIsDark] = useState(true);

  const body = document.body;
  if (isDark) {
    body.setAttribute("data-theme", "dark");
    localStorage.getItem("theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
  }

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <>
      <Toggle isChecked={isDark} handleChange={toggleDarkMode} />
      <div className="container">
        <h1>{isDark ? "Dark Mode 🌝" : "Light Mode 🌞"}</h1>
      </div>
    </>
  );
}

export default App;
