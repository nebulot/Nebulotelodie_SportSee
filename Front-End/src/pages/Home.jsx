import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import icons from "../assets/icons";
import mockData from "../utils/mockData";
import DataService from "../utils/dataService";

import Nutritional from "../components/Nutritional";
import CustomBarChart from "../components/CustomBarChart";
import CustomLineChart from "../components/CustomLineChart";
import CustomRadarChart from "../components/CustomRadarChart";
import CustomRadialBarChart from "../components/CustomPieChart";

import "../styles/HomeStyles.scss";

const useMockData = false;

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [invalidUserId, setInvalidUserId] = useState(false);

  const { id } = useParams();
  
  useEffect(() => {
    const parsedId = Number(id);
    if (isNaN(parsedId) || ![12, 18].includes(parsedId)) {
      setInvalidUserId(true);
    } else {
      setInvalidUserId(false);
      fetchData(parsedId, useMockData);
    }
  }, [id]);

  const fetchData = async (userId, useMock) => {
    try {
      console.log(useMock ? "Utilisation des données Mock" : "Récupération des données depuis l'API");

      const resultUserData = useMock
        ? mockData.USER_MAIN_DATA.find((data) => data.id === userId)
        : await DataService.getUserData(userId);
      const resultUserActivity = useMock
        ? mockData.USER_ACTIVITY.find((data) => data.userId === userId)
        : await DataService.getUserActivity(userId);
      const resultUserAverageSessions = useMock
        ? mockData.USER_AVERAGE_SESSIONS.find((data) => data.userId === userId)
        : await DataService.getUserAverageSessions(userId);
      const resultUserPerformance = useMock
        ? mockData.USER_PERFORMANCE.find((data) => data.userId === userId)
        : await DataService.getUserPerformance(userId);

      if (!resultUserData || !resultUserActivity || !resultUserAverageSessions || !resultUserPerformance) {
        throw new Error("Données utilisateur invalides");
      }

      setUserData(resultUserData);
      setUserActivity(resultUserActivity);
      setUserAverageSessions(resultUserAverageSessions);
      setUserPerformance(resultUserPerformance);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      setInvalidUserId(true);
    }
  };

  if (invalidUserId) {
    return <Navigate to="/404" replace />;
  }

  if (!userData || !userActivity || !userAverageSessions || !userPerformance) {
    return <div>Chargement...</div>;
  }

  const { userInfos, keyData, todayScore, score } = userData || {};
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = keyData || {};

  return (
    <div className="homeContainer">
      <h1>
        Bonjour <span>{userInfos?.firstName || "Utilisateur"}</span>
      </h1>
      <h2>Félicitations ! Vous avez explosé vos objectifs hier 👏</h2>
      <div className="customContainer">
        <div className="sectionContainer">
          <div className="ChartContainer">
            <CustomBarChart data={userActivity} />
          </div>
          <div className="containerChardCustom">
            <div className="LineContainer items">
              <CustomLineChart data={userAverageSessions} />
            </div>
            <div className="RadarContainer items">
              <CustomRadarChart data={userPerformance} />
            </div>
            <div className="CustomRadialBarChart items">
              <CustomRadialBarChart data={todayScore || score} />
            </div>
          </div>
        </div>
        <div className="containerNutritional">
          <Nutritional logo={icons.calories} title="Calories" value={calorieCount} unit="kcal" />
          <Nutritional logo={icons.proteins} title="Protéines" value={proteinCount} unit="g" />
          <Nutritional logo={icons.glucides} title="Glucides" value={carbohydrateCount} unit="g" />
          <Nutritional logo={icons.lipides} title="Lipides" value={lipidCount} unit="g" />
        </div>
      </div>
    </div>
  );
};

export default Home;
