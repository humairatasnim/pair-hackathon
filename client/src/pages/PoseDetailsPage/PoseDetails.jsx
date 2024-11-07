import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./PoseDetails.scss";

function PoseDetails({ poses }) {
  const { id } = useParams();
  const [pose, setPose] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const fetchYogaPose = async () => {
    const { data } = await axios.get(
      `https://yoga-api-nzy4.onrender.com/v1/poses?id=${id}`
    );
    setPose(data);
  };

  useEffect(() => {
    fetchYogaPose();
    const completedPoses =
      JSON.parse(localStorage.getItem("completedPoses")) || [];
    setIsCompleted(completedPoses.includes(parseInt(id, 10)));
  }, [id]);

  const handleCheckboxChange = () => {
    const completedPoses =
      JSON.parse(localStorage.getItem("completedPoses")) || [];
    if (isCompleted) {
      const updatedPoses = completedPoses.filter(
        (poseId) => poseId !== parseInt(id, 10)
      );
      localStorage.setItem("completedPoses", JSON.stringify(updatedPoses));
    } else {
      completedPoses.push(parseInt(id, 10));
      localStorage.setItem("completedPoses", JSON.stringify(completedPoses));
    }
    setIsCompleted(!isCompleted);
  };

  if (!pose) {
    <div>Loading...</div>;
  }

  return (
    <>
      <div className="pose">
        <h2 className="pose__title">{pose.english_name}</h2>
        <p className="pose__subtitle">{pose.sanskrit_name}</p>
        <img
          className="pose__image"
          src={pose.url_png}
          alt={pose.english_name}
        />
        <p className="pose__description">{pose.pose_description}</p>
        <label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
          />
          Practiced!
        </label>
      </div>
      <div className="back">
        <Link to="/" className="back__link">
          Choose another pose
        </Link>
      </div>
    </>
  );
}

export default PoseDetails;
