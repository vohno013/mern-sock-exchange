import React from "react";

const Footer = (prop) => {
    return (
        <footer className={prop.environment === "development" ? "bg-yellow" : prop.environment === "production" ? "bg-green" : ""}>
            <div><strong><b>{prop.environment.toUpperCase()}</b></strong></div>
        </footer>
    );
};

export default Footer;