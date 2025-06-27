import React from "react";
import Promo from "./promo";

const Featured = (props) => {
  return (
    <div className="card-container d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>
      {
        props.data.map((promo) => (
          <Promo key={promo.id} data={promo} />
        ))
      }
    </div>
  );
}

export default Featured;