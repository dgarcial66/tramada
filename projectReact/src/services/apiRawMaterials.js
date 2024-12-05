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

  async updateMaterial(body, id) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/rawMaterials/${id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      console.log(res);
      return res;
    } catch (error) {
      console.error(error.message);
    }
  }

  async deductMaterial(id, body) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/rawMaterials/deduct/${id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      console.log(res);
      return res;
    } catch (error) {}
  }
}

export { ApiRawMaterials };
