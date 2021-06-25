import { useStore } from 'react-context-hook';

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode, deleteDarkMode] = useStore('darkMode');

  return (
    <div className="dark-mode-switch" onClick={() => setDarkMode(!darkMode)}>
      <span className={`dark-mode-switch__btn ${darkMode ? "active" : ""}`}></span>
    </div>
  );
}

export default DarkModeSwitch;