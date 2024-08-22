const QUIZ_API_KEY = "kVjCK8EW8k2fMMzAFxJNgXvAwckmYFlkq3Vhnxue";

export async function getCategories() {
  try {
    const response = await fetch(
      `https://quizapi.io/api/v1/categories?apiKey=${QUIZ_API_KEY}`,
    );

    if (!response.ok) {
      return [];
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("[Error on fetching categories]: ", error);
  }
}

export async function getQuestions(category: string) {
  try {
    const response = await fetch(
      `https://quizapi.io/api/v1/questions?apiKey=${QUIZ_API_KEY}&category=${category}&limit=10`,
    );

    if (!response.ok) {
      return [];
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("[Error on fetching categories]: ", error);
  }
}
