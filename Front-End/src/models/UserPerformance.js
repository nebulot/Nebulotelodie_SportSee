import { Performance } from "./Performance";

export class UserPerformance {
  /**
   * @param { Object } kind list of performances
   * @param { Array } data array of user performances
   */
  constructor(kind, data) {
    for (const key in kind) {
      // Recherche de l'élément dans data
      const found = data.find((d) => d.kind == key);

      // Si l'élément est trouvé, crée la nouvelle performance
      if (found) {
        this[kind[key]] = new Performance(
          this.formatLabel(kind[key]),
          found.value
        );
      } else {
        // Sinon, affiche un avertissement et donne une valeur par défaut (ici 0)
        console.warn(`No data found for kind: ${key}`);
        this[kind[key]] = new Performance(this.formatLabel(kind[key]), 0);
      }
    }
  }

  /**
   * @param { String } labelToFormat name of the label
   * @returns translates the label in french
   */
  formatLabel(labelToFormat) {
    switch (labelToFormat) {
      case "cardio":
        return "Cardio";
      case "energy":
        return "Energie";
      case "endurance":
        return "Endurance";
      case "strength":
        return "Force";
      case "speed":
        return "Vitesse";
      case "intensity":
        return "Intensité";
      default:
        return labelToFormat;
    }
  }
}
