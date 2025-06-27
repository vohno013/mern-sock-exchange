import React from "react";

const Navigator = (props) => {
    return (
        <div style={{display: 'flex', justifyContent: "space-between", marginBottom: '20px' }}>
            <button className="btn btn-primary" onClick={() => {props.setPage(props.page - 1)}}>Back</button>
            <button className="btn btn-primary" onClick={() => {props.setPage(props.page + 1)}}>Next</button>
        </div>
    );
}

export default Navigator;