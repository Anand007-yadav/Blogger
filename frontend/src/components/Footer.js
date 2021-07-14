import React from "react";

const Footer = () => (
    <footer>
        Created by <span id="rajat">Anand Yadav</span>
        <br />
        <span>
            <i
                className="fab fa-github"
                onClick={() =>
                    window.open("https://github.com/Anand007-yadav", "_blank")
                }
            ></i>{" "}
            
            <i
                className="fab fa-linkedin"
                onClick={() =>
                    window.open(
                        "https://www.linkedin.com/in/anandyadav09/",
                        "_blank"
                    )
                }
            ></i>{" "}
            <i
                className="fab fa-instagram"
                onClick={() =>
                    window.open(
                        "https://www.instagram.com/anand__2009/",
                        "_blank"
                    )
                }
            ></i>{" "}
           
        </span>
    </footer>
);

export default Footer;
