import {DarkModeSwitch} from "../components/components";

const Settings = () => {
  return (
    <section className="settings">
      <div className="container">
        <div className="settings-list">
          <div className="settings-list__tile">
            <h3 className="setting">Dark Mode</h3>
            <DarkModeSwitch />
          </div>
        </div>
      </div>
    </section>
  );
}
 
export default Settings;