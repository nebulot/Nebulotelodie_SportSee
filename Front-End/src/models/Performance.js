/**
 * @class
 * @classdesc Performance class, instantiate a single performance by a label and its value
 */
export class Performance {
  label;
  value;
  /**
   * @param { String } label performance name
   * @param { Number } value performance value
   */
  constructor(label, value) {
    this.label = label;
    this.value = value;
  }
}
