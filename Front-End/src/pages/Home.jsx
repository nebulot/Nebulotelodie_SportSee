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


// Option pour utiliser les données mockées.
const useMockData = false;

/**
 * The Home component is the main component of the application.
 * It manages user data, activity, average sessions and performance
 */

// Le composant Home est le composant principal de l'application.
//  il gère les données de l'utilisateur, l'activité, les sessions en moyenne et la performance.

const Home = () => {
  // Déclaration des états
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);

  const { id } = useParams();
  const userId = Number(id);
  /**
   * This function fetches user data based on the id.
   * If useMock is true, it will use mocked data. Otherwise, it will fetch the real data.
   * @param {number} id - The user's ID.
   * @param {boolean} useMock - Whether to use mocked data or not.
   */

  const fetchData = async (id, useMock) => {
    try {
      useMock
        ? console.log("Je suis dans les données Mock")
        : console.log("Je récuperer les datas dans l API");

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

      setUserData(useMock ? resultUserData : resultUserData.data);
      setUserActivity(useMock ? resultUserActivity : resultUserActivity.data);
      setUserAverageSessions(
        useMock ? resultUserAverageSessions : resultUserAverageSessions.data
      );
      setUserPerformance(
        useMock ? resultUserPerformance : resultUserPerformance.data
      );

      if (
        !resultUserData ||
        !resultUserActivity ||
        !resultUserAverageSessions ||
        !resultUserPerformance
      ) {
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données : ",
        error
      );
      setInvalidUserId(true);
    }
  };

  const [invalidUserId, setInvalidUserId] = useState(false);

  // Effet pour récupérer les données lors du montage du composant
  useEffect(() => {
    fetchData(userId, useMockData);
  }, [userId]); // Mettre à jour l'effet pour qu'il dépende de userId
  console.log(userId);

  if (invalidUserId) {
    return <Navigate to="/404" />;
  }

  // Si les données ne sont pas encore chargées, afficher "Loading..."
  if (!userData || !userActivity || !userAverageSessions) {
    return <div>Loading...</div>;
  }

  // Récupération des données clés
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
    userData.data.keyData;

  // Rendu du composant

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
