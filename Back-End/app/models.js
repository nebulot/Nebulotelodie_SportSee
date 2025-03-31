const {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} = require("./data");

/**
 * @description Retrieve the main user info (first name, last name, today score)
 * @param {number|string} id
 */
const getUserById = (id) => {
  id = Number(id); // Assure-toi que l'ID est bien un nombre
  return USER_MAIN_DATA.find((user) => user.id === id);
};

/**
 * @param {number|string} id
 */
const getUserActivityById = (id) => {
  id = Number(id);
  return USER_ACTIVITY.find((userActivity) => userActivity.userId === id);
};

/**
 * @param {number|string} id
 */
const getUserAverageSession = (id) => {
  id = Number(id);
  return USER_AVERAGE_SESSIONS.find(
    (userActivity) => userActivity.userId === id
  );
};

/**
 * @param {number|string} id
 */
const getUserPerformance = (id) => {
  id = Number(id);
  return USER_PERFORMANCE.find(
    (userPerformance) => userPerformance.userId === id
  );
};

module.exports = {
  getUserById,
  getUserActivityById,
  getUserAverageSession,
  getUserPerformance,
};
