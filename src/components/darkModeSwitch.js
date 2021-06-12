import {useState, useEffect} from "react";
import { getSetting, setSetting } from "src/data/settings-repository";

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(getSetting('darkMode') || false);

  useEffect(() => {
    const r = document.querySelector('html');
    r.className = darkMode ? "dark-mode" : "";

    if (darkMode) setSetting('darkMode', true);
    else setSetting('darkMode', false);

  }, [darkMode])

  return ( 
    <div className="darkmode-btn" onClick={() => {setDarkMode(!darkMode)}}>
      {darkMode ? "mode_night" : "light_mode"}
    </div>
  );
}
 
export default DarkModeSwitch;