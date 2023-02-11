const API_URL = 'https://strapi.cleverland.by/api/books';

const getBookById = async (mealId) => {
  const response = await fetch(`${API_URL}/${mealId}`);

  return response.json();
};

const getAllCategories = async () => {
  const response = await fetch(API_URL);

  return response.json();
};

export { getBookById, getAllCategories };
