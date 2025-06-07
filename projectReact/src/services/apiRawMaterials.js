class ApiRawMaterials {
  constructor() {}

  static pathUrl = import.meta.env.VITE_API_URL;

  async getMaterials() {
    try {
      const res = await fetch(`${this.pathUrl}/api/v1/rawMaterials`, {
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

  async createRawMaterials(body) {
    try {
      const res = await fetch(`${this.pathUrl}/api/v1/rawMaterials`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log(res);
      return res;
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateMaterial(body, id) {
    try {
      const res = await fetch(
        `${this.pathUrl}/api/v1/rawMaterials/${id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          include: "credentials",
        }
      );
      console.log(res);
      return res;
    } catch (error) {
      console.error(error.message);
    }
  }

  async deductMaterial(id, body) {
    console.log("SOY BODY ULTIMO: ", body);
    try {
      const res = await fetch(
        `${this.pathUrl}/api/v1/rawMaterials/deduct/${id}`,
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
