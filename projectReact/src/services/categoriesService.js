class CategoriesService {
  constructor() {}

  async getCategoryRaw() {
    try {
      const res = await fetch("http://localhost:3000/api/v1/categories/raw", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { CategoriesService };
