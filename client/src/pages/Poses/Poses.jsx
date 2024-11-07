import { Link } from "react-router-dom";
// import "./Poses.scss";

function Poses({ poses }) {
  // Retrieve completed poses from localStorage
  const completedPoses =
    JSON.parse(localStorage.getItem("completedPoses")) || [];

  return (
    <>
      <h1>Yoga Pose of the Day</h1>
      <ul>
        {poses.map((pose) => (
          <li
            key={pose.id}
            className={completedPoses.includes(pose.id) ? "completed" : ""}
          >
            <Link to={`/pose/${pose.id}`}>
              <img src={pose.url_png} alt={`${pose.english_name}`} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Poses;
