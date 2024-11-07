import { useParams } from "react-router-dom";
// import "./App.scss";

function PoseDetails({ poses }) {
  const { id } = useParams();

  const pose = poses.find((pose) => pose.id === id);

  console.log(pose);

  if (!pose) {
    return <div>Loading pose details...</div>;
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
