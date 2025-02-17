import PropTypes from "prop-types";

function Progressbar(props) {
  console.log("progress ", props.progress);
  console.log("progress ", props.isProgess);
  return (
    <div className="progress-bar">
      <div className="progress-bar-percentage">
        <span
          className={` ${props.isProgess ? "show-progess" : "no-progress"}`}
          style={{ width: `${props.progress}%` }}
        >
          {props.progress}%
        </span>
      </div>
    </div>
  );
}

Progressbar.propTypes = {
  isProgess: PropTypes.bool,
  progress: PropTypes.number.isRequired,
};

export default Progressbar;
