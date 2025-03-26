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
  const userId = Number(id);

  // Vérification si userId est un nombre valide
  useEffect(() => {
    if (isNaN(userId) || userId <= 0) {
      setInvalidUserId(true); // Si id n'est pas valide, on redirige vers 404
    } else {
      fetchData(userId, useMockData);
    }
  }, [userId]);

  const fetchData = async (id, useMock) => {
    try {
      useMock
        ? console.log("Je suis dans les données Mock")
        : console.log("Je récupère les datas dans l'API");

      const resultUserData = useMock
        ? mockData.USER_MAIN_DATA.find((data) => data.data.id === id)
        : await DataService.getUserData(id);
      const resultUserActivity = useMock
        ? mockData.USER_ACTIVITY.find((data) => data.data.userId === id)
        : await DataService.getUserActivity(id);
      const resultUserAverageSessions = useMock
        ? mockData.USER_AVERAGE_SESSIONS.find((data) => data.data.userId === id)
        : await DataService.getUserAverageSessions(id);
      const resultUserPerformance = useMock
        ? mockData.USER_PERFORMANCE.find((data) => data.data.userId === id)
        : await DataService.getUserPerformance(id);

      if (
        !resultUserData ||
        !resultUserActivity ||
        !resultUserAverageSessions ||
        !resultUserPerformance
      ) {
        throw new Error("Invalid user data");
      }

      setUserData(useMock ? resultUserData : resultUserData.data);
      setUserActivity(useMock ? resultUserActivity : resultUserActivity.data);
      setUserAverageSessions(
        useMock ? resultUserAverageSessions : resultUserAverageSessions.data
      );
      setUserPerformance(
        useMock ? resultUserPerformance : resultUserPerformance.data
      );
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données : ",
        error
      );
      setInvalidUserId(true); // Si une erreur se produit, on marque l'id comme invalide
    }
  };

  if (invalidUserId) {
    return <Navigate to="/404" />;
  }

  // Si les données ne sont pas encore chargées, afficher "Loading..."
  if (!userData || !userActivity || !userAverageSessions || !userPerformance) {
    return <div>Loading...</div>;
  }

  // Récupération des données clés
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
    userData.data.keyData;

  return (
    <div className="homeContainer">
      <h1>
        Bonjour <span>{userData.data.userInfos.firstName}</span>
      </h1>
      <h2>Félicitations ! Vous avez explosé vos objectifs hier 👏</h2>
      <div className="customContainer">
        <div className="sectionContainer">
          <div className="ChartContainer">
            <CustomBarChart data={userActivity.data} />
          </div>
          <div className="containerChardCustom">
            <div className="LineContainer items">
              <CustomLineChart data={userAverageSessions.data} />
            </div>
            <div className="RadarContainer items">
              <CustomRadarChart data={userPerformance.data} />
            </div>
            <div className="CustomRadialBarChart items">
              <CustomRadialBarChart
                data={userData.data.todayScore || userData.data.score}
              />
            </div>
          </div>
        </div>
        <div className="containerNutritional">
          <Nutritional
            logo={icons.calories}
            title="Calories"
            value={calorieCount}
            unit="kcal"
          />
          <Nutritional
            logo={icons.proteins}
            title="Protéines"
            value={proteinCount}
            unit="g"
          />
          <Nutritional
            logo={icons.glucides}
            title="Glucides"
            value={carbohydrateCount}
            unit="g"
          />
          <Nutritional
            logo={icons.lipides}
            title="Lipides"
            value={lipidCount}
            unit="g"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;