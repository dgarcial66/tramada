class ApiFetch {
  constructor() {}

  static async authUser(body) {
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.status === 400) {
        throw new Error(res.status);
      }

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message.info);
      }

      return await res.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async create(body) {
    try {
      const res = await fetch("http://localhost:3000/api/v1/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log(res);

      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { ApiFetch };
