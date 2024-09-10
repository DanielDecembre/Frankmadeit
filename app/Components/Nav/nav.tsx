import React from "react";
import Image from "next/image";
import "./nav.css";

function Nav() {
  return (
    <div className="nav-container">
      <div className="navbar">
        <ul className="list">
          <li>
            <a href="Film">films</a>
          </li>
          <li>
            
          </li>
          <li>
            
          </li>
        </ul>
        <div className="logo">
          <Image
            alt="Logo for Frank"
            src="/FRANKblanc.png"
            height={95}
            width={95}
          />
        </div>
      </div>
    </div>
  );
}

export default Nav;