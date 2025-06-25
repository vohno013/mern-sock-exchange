import React from "react";

const Footer = (prop) => {
    return (
        <footer className="text-muted">
            <div><strong>{prop.environment}</strong></div>
        </footer>
    );
};

export default Footer;