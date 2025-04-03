import * as tf from "@tensorflow/tfjs";

// Define realistic input limits
const limits = {
  water: { min: 2, max: 5 }, // Liters
  exercise: { min: 1, max: 3 }, // Hours per week
  herbal: { min: 1, max: 3 }, // Units per week
  junkFood: { min: 0, max: 4 }, // Meals per week
  sleep: { min: 6, max: 8 }, // Hours per night
  meditation: { min: 3, max: 7 }, // Days per week
  stress: { min: 1, max: 3 }, // Scale 1-5
};

// Function to train the model
export async function trainModel() {
  const model = tf.sequential();

  model.add(tf.layers.dense({ inputShape: [7], units: 16, activation: "relu" }));
  model.add(tf.layers.dense({ units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

  model.compile({ optimizer: tf.train.adam(), loss: "meanSquaredError" });

  const xs = tf.tensor2d([
    [2, 3, 1, 2, 8, 4, 2],
    [4, 2, 3, 1, 7, 5, 2],
    [5, 3, 2, 0, 9, 6, 1],
    [1, 5, 0, 6, 5, 2, 4],
  ]);

  const ys = tf.tensor2d([
    [0.8], [0.9], [1.0], [0.5],
  ]);

  await model.fit(xs, ys, { epochs: 100 });

  return model;
}

// Function to generate recommendations
export async function predictRecommendations(inputValues) {
  const model = await trainModel();
  const inputTensor = tf.tensor2d([inputValues]);
  const prediction = model.predict(inputTensor);
  const score = (await prediction.data())[0];

  let recommendations = []; // Now it's an array

  let needsImprovement = false;

  // Check each input against its limit and add specific suggestions
  if (inputValues[0] < limits.water.min) {
    recommendations.push(`Increase water intake to at least ${limits.water.min}L.`);
    needsImprovement = true;
  }
  if (inputValues[0] > limits.water.max) {
    recommendations.push(`Reduce water intake to a maximum of ${limits.water.max}L.`);
    needsImprovement = true;
  }

  if (inputValues[1] > limits.exercise.max) {
    recommendations.push(`Reduce exercise to a maximum of ${limits.exercise.max} hours per week.`);
    needsImprovement = true;
  }
  if (inputValues[1] < limits.exercise.min) {
    recommendations.push(`Exercise at least ${limits.exercise.min} hours per week.`);
    needsImprovement = true;
  }

  if (inputValues[2] < limits.herbal.min) {
    recommendations.push(`Consider taking at least ${limits.herbal.min} herbal products per week.`);
    needsImprovement = true;
  }

  if (inputValues[3] > limits.junkFood.max) {
    recommendations.push(`Reduce junk food intake to a maximum of ${limits.junkFood.max} meals per week.`);
    needsImprovement = true;
  }

  if (inputValues[4] > limits.sleep.max) {
    recommendations.push(`Reduce sleep to a maximum of ${limits.sleep.max} hours per night.`);
    needsImprovement = true;
  }
  if (inputValues[4] < limits.sleep.min) {
    recommendations.push(`Ensure you get at least ${limits.sleep.min} hours of sleep per night.`);
    needsImprovement = true;
  }

  if (inputValues[5] < limits.meditation.min) {
    recommendations.push(`Increase meditation to at least ${limits.meditation.min} days per week.`);
    needsImprovement = true;
  }

  if (inputValues[6] > limits.stress.max) {
    recommendations.push(`Manage stress levels! Keep them below ${limits.stress.max} on a 5-point scale.`);
    needsImprovement = true;
  }

  // If no improvements are needed, return a positive message
  if (!needsImprovement) {
    return ["Your lifestyle is quite balanced! Keep up the good work."]; // Return as an array
  } else {
    recommendations.unshift("You're on the right track! But some improvements can be made:"); // Add main message at the top
  }

  return recommendations;
}
