import "./light.css";
import PropTypes from "prop-types";

function Light({ lightOrder, isActiveLight }) {
  return (
    <>
      {lightOrder?.map((light) => {
        return (
          <div
            className="active-light"
            key={light.color}
            style={{
              backgroundColor: light.color,
              opacity: light.color === isActiveLight ? 1 : 0.43,
              boxShadow: light.color === isActiveLight ? `0 0 20px 10px ${light.color}` : ""
            }}
          ></div>
        );
      })}
    </>
  );
}

Light.propTypes = {
  lightOrder: PropTypes.array,
  isActiveLight: PropTypes.string
};

export default Light;
