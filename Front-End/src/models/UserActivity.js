import { DailyActivity } from "./DailyActivity.js";

/**
 * @class
 * @classdesc UserActivity class, instantiate user activites by sessions
 */
export class UserActivity {
  userId;
  sessions;
  /**
   * @param { String } userId user id
   * @param { Array } sessions array of user sessions
   */
  constructor(userId, sessions) {
    this.userId = userId;
    this.sessions = sessions.map(
      (session) =>
        new DailyActivity(session.day, session.kilogram, session.calories)
    );
  }
}
