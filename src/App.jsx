
import { useState } from "react";
import "./App.css";
const hasLiked=true;
const Card = ({ title }) => {
  const [hasLiked,setHasLiked]=useState(false)

  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={()=>{setHasLiked(!hasLiked)}}>
        {hasLiked ? "❤️" : "🤍"}

      </button>
    </div>
  );
};
function App() {
  return (
    <div className="card-container">
      

      <Card title="Bahubali" rating="8.5" isCool={true} actors={[{name:'Actors'}]} hasLiked={hasLiked}/>
      <Card title="Salaar" rating="8" />
      <Card title="Kalki" rating="9" />
    </div>
  );
}

export default App;
