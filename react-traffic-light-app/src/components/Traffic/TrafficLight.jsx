import { useEffect, useState } from "react";
import Light from "../Light/Light";
import "./traffic.css";
import PropTypes from "prop-types";

function TrafficLight({ data }) {

  // set active light by default to current light
  const [isActiveLight, setIsActiveLight] = useState(data[0]);

  useEffect(() => {
    let timeId = setTimeout(() => {
      // current light 0 --> next light 1
      // current light 1 --> next light 2
      // current light 2 --> next light 0
      const currentLightIdx = data?.findIndex((light) => {
        return light.color === isActiveLight.color;
      });

      const nextLightIdx = data[currentLightIdx + 1]
        ? currentLightIdx + 1
        : 0;

      setIsActiveLight(data[nextLightIdx]); 
    }, isActiveLight.time);

    return () => clearTimeout(timeId);

  }, [isActiveLight, data]);

  return (
    <div className="traffic-light">
      <h1>Traffic Light</h1>
      <Light lightOrder={data} isActiveLight={isActiveLight.color} />
    </div>
  );
}

TrafficLight.propTypes = {
  data: PropTypes.array,
};

export default TrafficLight;
