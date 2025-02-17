import React, { useState } from "react";
import useFetchApi from "./../hooks/useFetchApi";
import { FcPrevious, FcNext } from "react-icons/fc";
function ImageSlider() {
  // We are fetching all the data from fetchapi custom hook..
  const { responseData, loading } = useFetchApi(
    "https://mocki.io/v1/6ab0b9d9-1885-4dc2-a63d-72b672ef2616"
  );

  // Get the first value from the response...
  const [value, setValue] = useState(3);

  return (
    <div>
      <div className="text-center">
        <h4 className="fw-bold">React Slider</h4>
      </div>

      <div className="slider m-auto p-3">
        <div className="slider-wrapper">
          {responseData.map((items, index) => {
            let slideClassPostion = "nextSlide";
            if (index === value && index - 1) {
              slideClassPostion = "active";
            }
            if (index === value - 1) {
              slideClassPostion = "prevSlide";
            }
            return (
              <div
                className={`slider-prettier ${slideClassPostion}`}
                key={items.id}
              >
                <h2 className="fw-bold">{items.title}</h2>
                <p>{items.description}</p>
                <div>
                  <img className="img-fluid" src={items.url} alt="" />
                </div>
              </div>
            );
          })}
        </div>

        <button className="btn-next" onClick={() => setValue(value - 1)}>
          <FcPrevious />
        </button>
        <button className="btn-prev" onClick={() => setValue(value + 1)}>
          <FcNext />
        </button>
      </div>
    </div>
  );
}

export default ImageSlider;
