import React from "react";


const Promo = (prop) => {
    return (
        <div className="card">
            <div className="card bg-light">
                <div className="card-text">{prop.data.feature}</div>
                <div className="card-text"><a href="#">Click to buy!</a></div>
            </div>
        </div>
    );
};

export default Promo;