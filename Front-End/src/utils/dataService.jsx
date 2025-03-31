import axios from "axios";

const API_URL = "http://localhost:3000/user";

/**
 * DataService Class
 *
 * This class is responsible for fetching and posting user data from/to the API.
 * Each method corresponds to a different API endpoint.
 *
 * @class
 */
class DataService {

/**
 * Fetch user data for a given user id
 * @param {number|string} userId - The id of the user
 * @returns {Promise} Axios promise with user data
 */
async getUserData(userId) {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data; // Retourner directement les données
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Gestion du 404
      console.error(`Utilisateur avec ID ${userId} non trouvé.`);
    } else {
      // Autres erreurs
      console.error('Erreur lors de la récupération des données utilisateur', error);
    }
    throw error; // Relancer l'erreur pour la gérer dans le composant appelant
  }
}

  /**
   * Fetch user activity for a given user id
   * @param {number|string} userId - The id of the user
   * @returns {Promise} Axios promise with user activity data
   */
  getUserActivity(userId) {
    return axios.get(`${API_URL}/${userId}/activity`);
  }

  /**
   * Fetch average session data for a given user id
   * @param {number|string} userId - The id of the user
   * @returns {Promise} Axios promise with average session data
   */
  getUserAverageSessions(userId) {
    return axios.get(`${API_URL}/${userId}/average-sessions`);
  }

  /**
   * Fetch performance data for a given user id
   * @param {number|string} userId - The id of the user
   * @returns {Promise} Axios promise with user performance data
   */
  getUserPerformance(userId) {
    return axios.get(`${API_URL}/${userId}/performance`);
  }

  /**
   * Post data to the API
   * @param {Object} data - The data to be posted
   * @returns {Promise} Axios promise with the response from the API
   */
  postData(data) {
    return axios.post(API_URL, data);
  }
}

const dataServiceInstance = new DataService();
export default dataServiceInstance;