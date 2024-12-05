class ApiSupplier {
  constructor() {}

  async getSupplier() {
    try {
      const res = await fetch("http://localhost:3000/api/v1/supplier", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return res;
    } catch (error) {
      console.error(error.message);
    }
  }

  async createSupplier(body) {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/supplier`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return res;
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateSupplier(body, id) {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/supplier/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  async suppliesDelete(id) {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/supplier/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return res;
    } catch (error) {
      console.error(error.message);
    }
  }
}

export { ApiSupplier };
