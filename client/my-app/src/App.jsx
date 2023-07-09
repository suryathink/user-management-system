import './App.css';
import Edit from './Components/Edit';
import Home from "./Components/Home"
import { Routes, Route } from 'react-router-dom';
import View from './Components/View';
import Delete from './Components/Delete';


function App() {
  return (
    <div className="App">
     <Routes>
     <Route path = "/" element = {<Home/>} />
     <Route path = "/edit" element = {<Edit/>} />
     <Route path = "/view" element = {<View/>} />
     <Route path = "/delete" element = {<Delete/>} />
     </Routes>
    </div>
  );
}

export default App;
