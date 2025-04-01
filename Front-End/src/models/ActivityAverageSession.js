/**
 * @class
 * @classdesc ActivityAverageSession class, instantiate a session by day and length
 */
export class ActivityAverageSession {
  day;
  sessionLength;
  /**
   * @param { String } day day of a session
   * @param { Number } sessionLength length of a session
   */
  constructor(day, sessionLength) {
    this.day = day;
    this.sessionLength = sessionLength;
  }
}
