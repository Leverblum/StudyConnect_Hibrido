import { useCallback, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import {
    createEventRequest,
    deleteEventRequest,
    getEventsRequest,
    updateEventRequest,
} from "../services/api";
import { Event } from "../types/Task";

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  refreshEvents: () => Promise<void>;
  addEvent: (event: Omit<Event, "id" | "created_at">) => Promise<Event | null>;
  updateEvent: (id: number, updates: Partial<Event>) => Promise<Event | null>;
  deleteEvent: (id: number) => Promise<boolean>;
}

export function useEvents(): UseEventsReturn {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshEvents = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getEventsRequest(token);
      setEvents(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Error al cargar eventos");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  const addEvent = useCallback(
    async (event: Omit<Event, "id" | "created_at">) => {
      if (!token) return null;

      try {
        const newEvent = await createEventRequest(event, token);
        setEvents((prev) => [...prev, newEvent]);
        return newEvent;
      } catch (err: any) {
        const message = err.message || "Error al crear evento";
        setError(message);
        Alert.alert("Error", message);
        return null;
      }
    },
    [token],
  );

  const updateEvent = useCallback(
    async (id: number, updates: Partial<Event>) => {
      if (!token) return null;

      try {
        const updated = await updateEventRequest(id, updates, token);
        setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
        return updated;
      } catch (err: any) {
        const message = err.message || "Error al actualizar evento";
        setError(message);
        Alert.alert("Error", message);
        return null;
      }
    },
    [token],
  );

  const deleteEvent = useCallback(
    async (id: number) => {
      if (!token) return false;

      try {
        await deleteEventRequest(id, token);
        setEvents((prev) => prev.filter((e) => e.id !== id));
        return true;
      } catch (err: any) {
        const message = err.message || "Error al eliminar evento";
        setError(message);
        Alert.alert("Error", message);
        return false;
      }
    },
    [token],
  );

  return {
    events,
    loading,
    error,
    refreshEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}
