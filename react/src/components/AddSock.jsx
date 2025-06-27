import React, { useState } from "react";

const AddSock = () => {
  const [sockData, setSockData] = useState({
    userId: "",
    sockDetails: {
      size: "Small",
      color: "",
      pattern: "",
      material: "",
      condition: "New",
      forFoot: "Left",
    },
    additionalFeatures: {
      waterResistant: false,
      padded: false,
      antiBacterial: false,
    },
    addedTimestamp: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in sockData.sockDetails) {
      setSockData({
        ...sockData,
        sockDetails: { ...sockData.sockDetails, [name]: value },
      });
    } else if (name in sockData.additionalFeatures) {
      setSockData({
        ...sockData,
        additionalFeatures: {
          ...sockData.additionalFeatures,
          [name]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setSockData({
        ...sockData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = {
      ...sockData,
      addedTimestamp: new Date().toISOString(),
    };

    try {
      // TODO: Make a POST request to the API to add the sock
      const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Handle post submission logic (like showing a success message)
    } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here
    }
  };

  return (
    <form className="p-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          className="form-control"
          id="userId"
          name="userId"
          value={sockData.userId}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="size">Size</label>
        <select
          className="form-control"
          id="size"
          name="size"
          value={sockData.sockDetails.size}
          onChange={handleChange}
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="color">Color</label>
        <input
          type="text"
          className="form-control"
          id="color"
          name="color"
          value={sockData.sockDetails.color}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pattern">Pattern</label>
        <input
          type="text"
          className="form-control"
          id="pattern"
          name="pattern"
          value={sockData.sockDetails.pattern}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="material">Material</label>
        <input
          type="text"
          className="form-control"
          id="material"
          name="material"
          value={sockData.sockDetails.material}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="condition">Condition</label>
        <select
          className="form-control"
          id="condition"
          name="condition"
          value={sockData.sockDetails.condition}
          onChange={handleChange}
        >
          <option>Used</option>
          <option>New</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="forFoot">For Foot</label>
        <select
          className="form-control"
          id="forFoot"
          name="forFoot"
          value={sockData.sockDetails.forFoot}
          onChange={handleChange}
        >
          <option>Left</option>
          <option>Right</option>
          <option>Both</option>
        </select>
      </div>
      <div className="row">
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="waterResistant"
            name="waterResistant"
            value={sockData.additionalFeatures.waterResistant}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="waterResistant">
            Water Resistant
          </label>
        </div>
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="padded"
            name="padded"
            value={sockData.additionalFeatures.padded}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="padded">
            Padded
          </label>
        </div>
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="antiBacterial"
            name="antiBacterial"
            value={sockData.additionalFeatures.antiBacterial}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="antiBacterial">
            Anti Bacterial
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AddSock;