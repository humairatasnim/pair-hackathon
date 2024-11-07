import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./PoseDetails.scss";

function PoseDetails({ poses }) {
  const { id } = useParams();
  const [pose, setPose] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");

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

    // Retrieve custom image URL for this pose, if any
    const savedImageUrl = localStorage.getItem(`poseImage_${id}`);
    setCurrentImageUrl(savedImageUrl || pose.url_png);
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

  const handleImageUrlChange = (event) => {
    setCustomImageUrl(event.target.value);
  };

  const handleImageUrlSubmit = () => {
    localStorage.setItem(`poseImage_${id}`, customImageUrl);
    setCurrentImageUrl(customImageUrl);
    setCustomImageUrl(""); // Clear the input field
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
          src={currentImageUrl ? currentImageUrl : pose.url_png}
          alt={pose.english_name}
        />
        <p className="pose__description">{pose.pose_description}</p>
        <div class="checkbox-button">
          <input type="checkbox" id="checkbox" class="checkbox-button__input" checked={isCompleted}
            onChange={handleCheckboxChange}/>
          <label for="checkbox" class="checkbox-button__label">Mark as Practiced</label>
        </div>
        <div className="pose__image-input">
        <input
          type="text"
          placeholder="Enter custom image URL"
          value={customImageUrl}
          onChange={handleImageUrlChange}
        />
        <button onClick={handleImageUrlSubmit}>Save Image</button>
      </div>
      <div className="back-container">
          <Link to="/" className="back-button">
            Pick a different pose
          </Link>
        </div>
      </div>
    </>
  );
}

export default PoseDetails;
