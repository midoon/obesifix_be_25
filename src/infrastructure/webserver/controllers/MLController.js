export default class MLController {
  constructor(mlUseCase) {
    this.mlUseCase = mlUseCase;
  }

  classification = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(403).json({
          status: false,
          message: "Image is required",
        });
      }

      const { food_data } = await this.mlUseCase.preprocessImage(req.file);
      console.log(food_data);

      res.status(201).send({
        status: true,
        statusCode: 201,
        food_data: {
          name: food_data.name,
          serving: food_data.serving,
          calorie: food_data.total_cal,
          carbohydrate: food_data.total_carb,
          fat: food_data.total_fat,
          protein: food_data.total_protein,
          description: food_data.description,
        },
      });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };
}
