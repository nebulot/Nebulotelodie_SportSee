import { UserMainData } from "../models/UserMainData";
import { UserActivity } from "../models/UserActivity"
import { UserPerformance } from "../models/UserPerformance";
import { UserActivityAverageSession } from "../models/UserActivityAverageSession";

class ApiData {
    static url=`http://localhost:3000/user/`;
    /**
     * get user main data from API
     * @param { String } id user id 
     * @returns { Object }
     */
    /*static getUserMainData = async (id) => {
        return fetch(ApiData.url + id)
            .then((res) => res.json())
            .then(({ data }) => new UserMainData(data.id, data.userInfos, data.todayScore || data.score, data.keyData));
    }*/
            /*static getUserMainData = async (id) => {
                return fetch(ApiData.url + id)
                    .then((res) => {
                        console.log("Raw response:", res); // Vérifie si la réponse est correcte
                        
                        return res.json();
                    })
                    .then((response) => {
                        console.log("Parsed response:", response); // Vérifie le contenu
                        if (!response || !response.data) {
                            throw new Error("User data is missing or undefined!");
                        }
                        return new UserMainData(response.data.id, response.data.userInfos, response.data.todayScore || response.data.score, response.data.keyData);
                    })
                    .catch(error => {
                        console.error("Error in getUserMainData:", error);
                        return null;
                    });
            };*/
            static getUserMainData = async (id) => {
                return fetch(ApiData.url + id)
                    .then((res) => {
                        // Vérifie d'abord si la réponse HTTP est OK
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then((response) => {
                        console.log("Parsed response:", response); // Affiche la réponse complète dans la console
                        if (!response || !response.data) {
                            throw new Error("User data is missing or undefined!");
                        }
                        // Vérifie que la structure de données correspond à ce que tu attends
                        const { data } = response;
                        return new UserMainData(
                            data.id,
                            data.userInfos,
                            data.todayScore || data.score,
                            data.keyData
                        );
                    })
                    .catch((error) => {
                        console.error("Error in getUserMainData:", error);
                        return null; // Ou tu peux renvoyer une valeur par défaut si nécessaire
                    });
            };
            

    /**
     * get user activity from API (USER_ACTIVITY)
     * @param { String } id user id
     * @returns { Object }
     */
    static getUserActivity = async (id) => {
        return fetch(ApiData.url + id + '/activity')
            .then((res) => res.json())
            .then(({ data }) => new UserActivity(data.userId, data.sessions));
    }

    /**
     * get user performance from API (USER_PERFORMANCE)
     * @param { String } id user id 
     * @returns { Object }
     */
    static getUserPerformance = async (id) => {
        return fetch(ApiData.url + id + '/performance')
            .then((res) => res.json())
            .then(({ data }) => new UserPerformance(data.kind, data.data));
    }

    /**
     * get user average sessions from API (USER_AVERAGE_SESSIONS)
     * @param { String } id user id 
     * @returns { Object }
     */
    static getUserAverageSessions = async (id) => {
        return fetch(ApiData.url + id + '/average-sessions')
            .then((res) => res.json())
            .then(({ data }) => new UserActivityAverageSession(data.userId, data.sessions));
    }
}

export default ApiData