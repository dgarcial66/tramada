class ApiRawMaterials {
  constructor() {}

  async getMaterials() {
    try {
      const res = await fetch("http://localhost:3000/api/v1/supplies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { ApiRawMaterials };
