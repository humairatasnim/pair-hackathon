import { useEffect, useState } from "react";
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
    <>
      <h1>Yoga Pose of the Day</h1>
      <ul>
        {poses.map((pose) => (
          <li key={pose.id}>
            <img src={pose.url_png} alt={`${pose.english_name}`} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
