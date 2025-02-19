import { useEffect, useState } from "react";
import "./App.css";
import Progressbar from "./components/Progressbar";

function App() {
  const [progress, setProgress] = useState(0);
  const [isProgess, setIsProgress] = useState(false);

  useEffect(() => {
    setIsProgress(true);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          return prev; // 
        }
      });
    }, 20);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <>
      <h1>Progress Bar</h1>
      <div className="container">
        <Progressbar progress={progress} isProgess={isProgess} />
      </div>
    </>
  );
}

export default App;
