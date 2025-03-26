import React from "react";
import { NavLink } from "react-router-dom";
import logoTrend from "../assets/logoTrend.svg";

import { Head, Nav } from "../styles/HeaderStyles";

export default function Header() {
  return (
    <Head>
      <img src={logoTrend} alt="sportSee" aria-label="logo sportSee" />
      <Nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="#">Profil</NavLink>
        <NavLink to="#">Réglages</NavLink>
        <NavLink to="#">Communauté</NavLink>
      </Nav>
    </Head>
  );
}
