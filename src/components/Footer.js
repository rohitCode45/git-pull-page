import React from "react";
import "./Footer.scss";
import { git_icon } from "../Common/icons";

const footer_links = ["Terms","Privacy","Security","status",'Docs',"Contact GitHub","Pricing","API","Training", "Blog", "About"]

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-links">
          {footer_links.map((link, i) => {
            return <div className="footerLink">{link}</div>;
          })}
        </div>
        <div className="git-copyright">{git_icon} @ 2023 GitHub Inc.</div>
      </div>
    </div>
  );
}

export default Footer;
