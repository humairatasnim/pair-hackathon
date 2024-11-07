import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import PoseDetails from "./pages/PoseDetailsPage/PoseDetails";
import axios from "axios";
// import "./App.scss";

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
  console.log(poses);
  return (
    <BrowserRouter>
      <h1>Yoga Pose of the Day</h1>
      <ul>
        {poses.map((pose) => (
          <li key={pose.id}>
            <Link to={`/pose/${pose.id}`}>
              <img src={pose.url_png} alt={`${pose.english_name}`} />
            </Link>
          </li>
        ))}
      </ul>

      {/* Define Routes */}
      <Routes>
        {/* <Route path="/" element={<App />} /> */}

        <Route path="/pose/:id" element={<PoseDetails poses={poses} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
