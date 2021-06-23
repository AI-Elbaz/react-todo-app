import {useState, useEffect} from "react";
import { SettingsRepo } from "../data/repository";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(SettingsRepo.getAllData()['darkMode'] || false);

  useEffect(() => {
    const r = document.querySelector('html');
    r.className = darkMode ? "dark-mode" : "";

    if (darkMode) SettingsRepo.setData({'darkMode': true});
    else SettingsRepo.setData({'darkMode': false});
  }, [darkMode]);

  return ( 
    <div className="dark-mode-switch" onClick={() => setDarkMode(curr => !curr)}>
      <span className={`dark-mode-switch__btn ${darkMode ? "active" : ""}`}>
        {darkMode ? <Brightness2Icon /> : <WbSunnyIcon />}
      </span>
    </div>
  );
}
 
export default DarkModeSwitch;