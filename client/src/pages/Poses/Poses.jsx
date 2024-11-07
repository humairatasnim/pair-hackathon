import { Link } from "react-router-dom";
import "./Poses.scss";

function Poses({ poses }) {
  // Retrieve completed poses from localStorage
  const completedPoses =
    JSON.parse(localStorage.getItem("completedPoses")) || [];

  return (
    <>
      <header className="header">
        <h1 className="header__title">Embrace Your Yoga Journey</h1>
        <p className="header__subtitle">✨ You've already mastered {completedPoses.length} yoga poses ✨</p>
        <p className="header__paragraph">Select a pose below to get started:</p>
      </header>
      <ul className="poses">
        {poses.map((pose) => {
          // Retrieve the custom image URL if it exists
          const customImageUrl = localStorage.getItem(`poseImage_${pose.id}`);
          return (
            <li
              key={pose.id}
              className={
                completedPoses.includes(pose.id)
                  ? "completed poses__item"
                  : "poses__item"
              }
            >
              <Link to={`/pose/${pose.id}`}>
                <img
                  src={customImageUrl || pose.url_png}
                  alt={`${pose.english_name}`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Poses;
