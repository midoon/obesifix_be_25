import fetch from "node-fetch";
import FormData from "form-data";

export default class MLUseCase {
  constructor(userRpository, configLoader) {
    this.userRpository = userRpository;
    this.configLoader = configLoader;
  }

  async preprocessImage(imageFile) {
    if (!imageFile) {
      throw new Error("Image file is required");
    }

    const form = new FormData();
    form.append("image", imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype,
    });

    const mlUrl = this.configLoader.ML_BASE_URL + "/prediction";
    console.log("ML URL:", mlUrl);

    const response = await fetch(mlUrl, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`ML API error: ${response.statusText}`);
    }

    const result = await response.json();

    return result;
  }
}
