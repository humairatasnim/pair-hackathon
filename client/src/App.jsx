import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Poses from "./pages/Poses/Poses";
import PoseDetails from "./pages/PoseDetailsPage/PoseDetails";
import "./App.scss";

function App() {
  const [poses, setPoses] = useState([]);

  const fetchYogaPoses = async () => {
    const { data } = await axios.get(
      "https://yoga-api-nzy4.onrender.com/v1/poses"
    );
    setPoses(data);
  };

  useEffect(() => {
    fetchYogaPoses();
  }, []);

  if (!poses) {
    <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Poses poses={poses} />} />
        <Route path="/pose/:id" element={<PoseDetails poses={poses} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
