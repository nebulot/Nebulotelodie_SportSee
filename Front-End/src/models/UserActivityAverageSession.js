import { ActivityAverageSession } from "./ActivityAverageSession";

/**
 * @class
 * @classdesc UserActivityAverageSession, instantiate user average activities sessions
 */
export class UserActivityAverageSession {
  userId;
  sessions;
  /**
   * @param { String } userId user id
   * @param { Array } sessions array of user average activities sessions
   */
  constructor(userId, sessions) {
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    this.userId = userId;
    this.sessions = sessions.map(
      (session) =>
        new ActivityAverageSession(days[session.day - 1], session.sessionLength)
    );
  }
}
