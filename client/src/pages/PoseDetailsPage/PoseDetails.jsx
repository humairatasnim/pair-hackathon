import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import "./PoseDetails.scss";

function PoseDetails({ poses }) {
  const { id } = useParams();
  const [pose, setPose] = useState([]);

  const fetchYogaPose = async () => {
    const { data } = await axios.get(
      `https://yoga-api-nzy4.onrender.com/v1/poses?id=${id}`
    );
    setPose(data);
  };

  useEffect(() => {
    fetchYogaPose();
  }, []);

  if (!pose) {
    <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{pose.english_name}</h2>
      <img src={pose.url_png} alt={pose.english_name} />
      <p>{pose.sanskrit_name}</p>
      <p>{pose.description}</p>
    </div>
  );
}

export default PoseDetails;
