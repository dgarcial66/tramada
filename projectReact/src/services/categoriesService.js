class CategoriesService {
constructor() {
    this.pathUrl = import.meta.env.VITE_API_URL;
  }

  async getCategoryRaw() {
    try {
      const res = await fetch(`${this.pathUrl}/api/v1/categories/raw`, {
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
