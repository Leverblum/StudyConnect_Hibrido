import * as SecureStore from "expo-secure-store";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Platform } from "react-native";
import {
    loginRequest,
    registerRequest,
    updateUserProfileRequest,
} from "../services/api";
import { AuthResponse, User } from "../types/User";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateProfile: async () => null,
});

interface Props {
  children: ReactNode;
}

const STORAGE_TOKEN_KEY = "auth_token";
const STORAGE_USER_KEY = "auth_user";
const isWeb = Platform.OS === "web";

const getStorageItemAsync = async (key: string) => {
  if (isWeb && typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
};

const setStorageItemAsync = async (key: string, value: string) => {
  if (isWeb && typeof window !== "undefined") {
    window.localStorage.setItem(key, value);
    return;
  }
  return SecureStore.setItemAsync(key, value);
};

const deleteStorageItemAsync = async (key: string) => {
  if (isWeb && typeof window !== "undefined") {
    window.localStorage.removeItem(key);
    return;
  }
  return SecureStore.deleteItemAsync(key);
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 Cargar sesión guardada al inicializar
  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedToken = await getStorageItemAsync(STORAGE_TOKEN_KEY);
        const savedUser = await getStorageItemAsync(STORAGE_USER_KEY);

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error cargando sesión:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  // 🔐 LOGIN
  const login = async (email: string, password: string) => {
    try {
      const response: AuthResponse = await loginRequest(email, password);

      if (!response?.token || !response?.user) {
        throw new Error("Respuesta inválida del servidor");
      }

      setUser(response.user);
      setToken(response.token);

      // 💾 Guardar en almacenamiento seguro
      await setStorageItemAsync(STORAGE_TOKEN_KEY, response.token);
      await setStorageItemAsync(
        STORAGE_USER_KEY,
        JSON.stringify(response.user),
      );
    } catch (error: any) {
      console.error("Error login:", error);
      throw error;
    }
  };

  // 📝 REGISTER
  const register = async (name: string, email: string, password: string) => {
    try {
      const response: AuthResponse = await registerRequest(
        name,
        email,
        password,
      );

      if (!response?.token || !response?.user) {
        throw new Error("Respuesta inválida del servidor");
      }

      setUser(response.user);
      setToken(response.token);

      // 💾 Guardar en almacenamiento seguro
      await setStorageItemAsync(STORAGE_TOKEN_KEY, response.token);
      await setStorageItemAsync(
        STORAGE_USER_KEY,
        JSON.stringify(response.user),
      );
    } catch (error: any) {
      console.error("Error register:", error);
      throw error;
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      setUser(null);
      setToken(null);

      // 🗑️ Limpiar almacenamiento seguro
      await deleteStorageItemAsync(STORAGE_TOKEN_KEY);
      await deleteStorageItemAsync(STORAGE_USER_KEY);
    } catch (error) {
      console.error("Error logout:", error);
    }
  };

  // 📝 UPDATE PROFILE
  const updateProfile = async (userData: Partial<User>) => {
    if (!token || !user) {
      throw new Error("Token o usuario no disponible");
    }

    try {
      const updatedUser = await updateUserProfileRequest(
        token,
        user.id,
        userData,
      );
      setUser(updatedUser);
      await setStorageItemAsync(STORAGE_USER_KEY, JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error: any) {
      console.error("Error update profile:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
