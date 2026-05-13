import { useCallback, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import {
    createSubjectRequest,
    deleteSubjectRequest,
    getSubjectsRequest,
    updateSubjectRequest,
} from "../services/api";
import { Subject } from "../types/Subject";

interface UseSubjectsReturn {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
  refreshSubjects: () => Promise<void>;
  addSubject: (
    subject: Omit<Subject, "id" | "user_id" | "created_at">,
  ) => Promise<Subject | null>;
  updateSubject: (
    id: number,
    updates: Partial<Subject>,
  ) => Promise<Subject | null>;
  deleteSubject: (id: number) => Promise<boolean>;
}

export function useSubjects(): UseSubjectsReturn {
  const { token } = useContext(AuthContext);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshSubjects = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getSubjectsRequest(token);
      setSubjects(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Error al cargar materias");
      console.error("Error fetching subjects:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshSubjects();
  }, [refreshSubjects]);

  const addSubject = useCallback(
    async (subject: Omit<Subject, "id" | "user_id" | "created_at">) => {
      if (!token) return null;

      try {
        const newSubject = await createSubjectRequest(subject, token);
        setSubjects((prev) => [...prev, newSubject]);
        return newSubject;
      } catch (err: any) {
        const message = err.message || "Error al crear materia";
        setError(message);
        Alert.alert("Error", message);
        return null;
      }
    },
    [token],
  );

  const updateSubject = useCallback(
    async (id: number, updates: Partial<Subject>) => {
      if (!token) return null;

      try {
        const updated = await updateSubjectRequest(id, updates, token);
        setSubjects((prev) => prev.map((s) => (s.id === id ? updated : s)));
        return updated;
      } catch (err: any) {
        const message = err.message || "Error al actualizar materia";
        setError(message);
        Alert.alert("Error", message);
        return null;
      }
    },
    [token],
  );

  const deleteSubject = useCallback(
    async (id: number) => {
      if (!token) return false;

      try {
        await deleteSubjectRequest(id, token);
        setSubjects((prev) => prev.filter((s) => s.id !== id));
        return true;
      } catch (err: any) {
        const message = err.message || "Error al eliminar materia";
        const normalizedMessage = String(message).toLowerCase();
        if (
          normalizedMessage.includes("404") ||
          normalizedMessage.includes("not found") ||
          normalizedMessage.includes("no encontrado")
        ) {
          setSubjects((prev) => prev.filter((s) => s.id !== id));
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
    subjects,
    loading,
    error,
    refreshSubjects,
    addSubject,
    updateSubject,
    deleteSubject,
  };
}
