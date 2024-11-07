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
        <p className="header__paragraph">Select a pose below to get started:</p>
      </header>
      <ul className="poses">
        {poses.map((pose) => (
          <li
            key={pose.id}
            className={completedPoses.includes(pose.id) ? "completed" : ""}
          >
            <Link to={`/pose/${pose.id}`}>
              <img src={pose.url_svg} alt={`${pose.english_name}`} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Poses;
