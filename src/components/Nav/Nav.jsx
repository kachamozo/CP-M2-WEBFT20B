import React, { Component } from "react";
import { Link } from "react-router-dom";

// CUIDADOOOO. SI O SI CLASS COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/house/create"}>Create House</Link>
      </nav>
    );
  }
}

export default Nav;
