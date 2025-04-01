import { UserScore } from "./UserScore";

/**
 * @class
 * @classdesc UserMainData class, instantiate main user data
 */
export class UserMainData {
  id;
  userInfos;
  score;
  keyData;
  /**
   * @param { String } id user id
   * @param { Object } userInfos user infos (firstName, lastName, age)
   * @param { Number } score user score
   * @param { Object } keyData user key data (calorieCount, proteinCount, carbohydrateCount, lipidCount)
   */
  constructor(id, userInfos, score, keyData) {
    this.id = id;
    this.userInfos = userInfos;
    this.score = new UserScore(score);
    this.keyData = keyData;
  }
}
