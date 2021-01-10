import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import "./NavbarPage.css";
import { BiMoney } from "react-icons/bi";
import { Link } from "react-router-dom";

function NavbarPage({ saldo, owner }) {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  function getDot(price) {
    var num = price;
    var harga = num.toString();
    for (var i = harga.length; i > 0; i = i - 3) {
      harga = harga.slice(0, i) + "." + harga.slice(i, harga.length - 1);
      console.log(harga);
    }

    return harga;
  }
  return (
    <div>
      <Navbar fixed="top" className={`nav ${show && "nav_black"}`}>
        <Link to={{ pathname: "/", state: owner }}>
          <Navbar.Brand className="NavbarBrand">StreamFlix</Navbar.Brand>
        </Link>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="JumlahSaldo">
            <BiMoney className="LogoMoney" /> Rp.{getDot(saldo)},00
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarPage;
