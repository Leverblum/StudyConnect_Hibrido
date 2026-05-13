import { useCallback, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import {
    createActivityRequest,
    deleteActivityRequest,
    getActivitiesRequest,
    updateActivityRequest,
} from "../services/api";
import { Activity } from "../types/Task";

interface UseActivitiesReturn {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  refreshActivities: () => Promise<void>;
  addActivity: (
    activity: Omit<Activity, "id" | "created_at">,
  ) => Promise<Activity | null>;
  updateActivity: (
    id: number,
    updates: Partial<Activity>,
  ) => Promise<Activity | null>;
  deleteActivity: (id: number) => Promise<boolean>;
}

export function useActivities(): UseActivitiesReturn {
  const { token, user } = useContext(AuthContext);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshActivities = useCallback(async () => {
    if (!token || !user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getActivitiesRequest(token);

      setActivities(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Error al cargar actividades");
      console.error("Error fetching activities:", err);
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    refreshActivities();
  }, [refreshActivities]);

  const addActivity = useCallback(
    async (activity: Omit<Activity, "id" | "created_at">) => {
      if (!token) return null;

      try {
        const newActivity = await createActivityRequest(activity, token);
        setActivities((prev) => [...prev, newActivity]);
        return newActivity;
      } catch (err: any) {
        const message = err.message || "Error al crear actividad";
        setError(message);
        Alert.alert("Error", message);
        return null;
      }
    },
    [token],
  );

  const updateActivity = useCallback(
    async (id: number, updates: Partial<Activity>) => {
      if (!token) return null;

      try {
        const updated = await updateActivityRequest(id, updates, token);
        setActivities((prev) => prev.map((a) => (a.id === id ? updated : a)));
        return updated;
      } catch (err: any) {
        const message = err.message || "Error al actualizar actividad";
        setError(message);
        Alert.alert("Error", message);
        return null;
      }
    },
    [token],
  );

  const deleteActivity = useCallback(
    async (id: number) => {
      if (!token) return false;

      try {
        await deleteActivityRequest(id, token);
        setActivities((prev) => prev.filter((a) => a.id !== id));
        return true;
      } catch (err: any) {
        const message = err.message || "Error al eliminar actividad";
        if (/404|not found|no encontrado/i.test(message)) {
          setActivities((prev) => prev.filter((a) => a.id !== id));
          return true;
        }
        setError(message);
        Alert.alert("Error", message);
        return false;
      }
    },
    [token],
  );

  return {
    activities,
    loading,
    error,
    refreshActivities,
    addActivity,
    updateActivity,
    deleteActivity,
  };
}
