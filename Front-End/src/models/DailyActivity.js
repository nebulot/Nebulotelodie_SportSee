/**
 * @class
 * @classdesc DailyActivity class, instantiate an activity by day, weight(kilogram) and energy(calories)
 */
export class DailyActivity {
  day;
  kilogram;
  calories;
  /**
   * @param { String } day day of a session
   * @param { Number } kilogram weight during a session
   * @param { Number } calories energy during a session
   */
  constructor(day, kilogram, calories) {
    this.day = new Date(day).getDate();
    this.kilogram = kilogram;
    this.calories = calories;
  }
}
