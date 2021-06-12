const db = localStorage;

if (!localStorage.settings) {
  localStorage.setItem('settings', '{}');
}

export const getSetting = (setting) => {
  return JSON.parse(localStorage.getItem('settings'))[setting];
}

export const setSetting = (setting, value) => {
  let settings = JSON.parse(localStorage.getItem('settings'));
  settings[setting] = value;
  localStorage.setItem("settings", JSON.stringify(settings));
}