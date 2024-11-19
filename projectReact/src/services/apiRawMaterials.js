class ApiRawMaterials {
  constructor() {}

  async getMaterials() {
    try {
      const res = await fetch("http://localhost:3000/api/v1/rawMaterials", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { ApiRawMaterials };
