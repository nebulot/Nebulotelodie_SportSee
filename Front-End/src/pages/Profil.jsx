import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import mockData from "../utils/mockData";
import DataService from "../utils/dataService";

const useMockData = false;

const Profil = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [invalidUserId, setInvalidUserId] = useState(false);

  useEffect(() => {
    if (!id || isNaN(id) || (id !== "12" && id !== "18")) {
      setInvalidUserId(true); // Redirection si ID invalide
      return;
    }

    fetchData(Number(id), useMockData);
  }, [id]);

  const fetchData = async (id, useMock) => {
    try {
      const resultUserData = useMock
        ? mockData.USER_MAIN_DATA.find((data) => data.data.id === id)
        : await DataService.getUserData(id);

      if (!resultUserData) {
        throw new Error("Données utilisateur invalides");
      }

      setUserData(useMock ? resultUserData : resultUserData.data);
    } catch (error) {
      console.error("Erreur de récupération des données :", error);
      setInvalidUserId(true);
    }
  };

  if (invalidUserId) {
    return <Navigate to="/404" />;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profil de {userData.userInfos.firstName}</h1>
      <p>Score: {userData.todayScore || userData.score}</p>
    </div>
  );
};

export default Profil;
