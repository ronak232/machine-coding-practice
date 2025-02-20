import PropTypes from "prop-types";
import "../Toggle/toggle.css";

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <input
        className="toggle"
        type="checkbox"
        id="check"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check"></label>
    </div>
  );
};

Toggle.propTypes = {
  handleChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};
