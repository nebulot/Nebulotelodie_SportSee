/**
 * @class
 * @classdesc UserScore class, instantiate an user score
 */
export class UserScore {
  /**
   * @param { Number } score user score
   * @returns an array of object (score and difference) to adapt the user score chart
   */
  constructor(score) {
    return [
      { name: "score", value: score * 100 },
      { name: "difference", value: 100 - score * 100 },
    ];
  }
}
