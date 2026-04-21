import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { loginRequest } from "../services/api";
import { User } from "../types/User";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
});

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // 🔥 Cargar sesión guardada
  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        const savedUser = await AsyncStorage.getItem("user");

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log("Error cargando sesión:", error);
      }
    };

    loadSession();
  }, []);

  // 🔐 LOGIN REAL
  const login = async (email: string, password: string) => {
    try {
      const data = await loginRequest(email, password);

      if (!data || !data.token || !data.user) {
        throw new Error("Respuesta inválida del servidor");
      }

      setUser(data.user);
      setToken(data.token);

      // 💾 guardar sesión
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
    } catch (error: any) {
      console.log("Error login:", error.message);
      throw error;
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    setUser(null);
    setToken(null);

    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
