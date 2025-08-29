export const calculateNutritionStatus = (user) => {
  const weight = user.weight;
  const height_in_m = user.height / 100;

  const nutritionValue = weight / (height_in_m * height_in_m);
  const formatedNutritionValue = nutritionValue.toFixed(1);
  const parsedNutritionValue = parseFloat(formatedNutritionValue);

  let status = "";
  if (parsedNutritionValue < 18.5) {
    status = "underweight";
  } else if (parsedNutritionValue >= 18.5 && parsedNutritionValue <= 24.9) {
    status = "normal";
  } else if (parsedNutritionValue >= 25 && parsedNutritionValue <= 29.9) {
    status = "overweight";
  } else if (parsedNutritionValue >= 30) {
    status = "obese";
  }

  return status;
};
