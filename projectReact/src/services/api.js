class ApiFetch {
  constructor() {}

  static pathUrl = import.meta.env.VITE_API_URL;

  static async isLogin() {
    try {
      const res = await fetch(`${this.pathUrl}/api/v1/auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        return res.json();
      }
      console.log(
        "PODEMOS VER QUE TRAEMOS EL ACCESS EN EL BEARER: ",
        res.headers.get("Authorization")
      );
      console.log("AQUI RESPONDEMOS CON UN: ", res.status);
      const data = await res.json();
      return { data, status: res.status };
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        console.log(error.message);
        console.error("Error de red: No se pudo conectar al servidor");
        throw new Error(
          "No se pudo conectar al servidor. Inténtalo de nuevo más tarde."
        );
      } else {
        console.error("Error en isLogin:", error);
        throw error;
      }
    }
  }

  static async authUser(body) {
    try {
      const res = await fetch(`${this.pathUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (res.status === 400) {
        throw new Error(res.status);
      }

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message.info);
      }
      const accessToken = res.headers.get("Authorization")?.split(" ")[0];
      const data = await res.json();
      console.log("SOY DATOS AL INICIAR SESSION: ", data, " :: ", accessToken);
      return { data, token: accessToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async create(body) {
    try {
      const res = await fetch(`${this.pathUrl}/api/v1/user`, {
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

      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async logOut() {
    try {
      const res = await fetch(`${this.pathUrl}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) return { message: "Fallo al cerrar sesion" };
      console.log("Cerro sesion...");
    } catch (error) {
      console.log("Error al cerrar sesion: ", error);
      throw error;
    }
  }
}

export { ApiFetch };
