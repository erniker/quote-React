// Obtener la difencia de años
export function getYearDiference(year) {
  return new Date().getFullYear() - year;
}

// calcula el total a pagar segun la marca
export function calculateBrand(brand) {
  let increment;
  switch (brand) {
    case "europeo":
      increment = 1.3;
      break;
    case "americano":
      increment = 1.15;
      break;

    case "asiatico":
      increment = 1.05;
      break;
    default:
      break;
  }
  return increment;
}

// Calcula el tipo de seguro
export function getPlan(plan) {
  return plan === "basico" ? 1.2 : 1.5;
}

// Capitalizar nombres
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
