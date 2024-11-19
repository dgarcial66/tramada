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
      throw new Error(error.message);
    }
  }

  async suppliesId() {}
}

export { ApiSupplier };
