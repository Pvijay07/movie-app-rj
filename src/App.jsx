
import "./App.css";

const Card = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};
function App() {
  return (
    <div>
      <h2></h2>

      <Card title="Bahubali" rating="8.5" isCool={true} />
      <Card title="Salaar" rating="8" />
      <Card title="Kalki" rating="9" />
    </div>
  );
}

export default App;
