
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Video from "./components/video";
import Mission from "./components/Mission";
import Questionnaire from "./components/Questionnaire";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>
          <Video />
          <About />
          <Mission />
        </div>} />
        <Route path="/questionnaire" element={<Questionnaire />} />
      </Routes>
    </Router>
  );
}

export default App;
