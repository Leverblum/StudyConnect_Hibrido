const API_URL = "http://localhost:3000/api";

// 🔐 LOGIN
export const loginRequest = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en login");
  }

  return data;
};

// 🆕 REGISTER
export const registerRequest = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al registrar");
  }

  return data;
};

// 📚 GET SUBJECTS
export const getSubjectsRequest = async (token: string) => {
  const response = await fetch(`${API_URL}/subjects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener materias");
  }

  return data;
};

// ➕ CREATE SUBJECT
export const createSubjectRequest = async (
  name: string,
  color: string,
  token: string,
) => {
  const response = await fetch(`${API_URL}/subjects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, color }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear materia");
  }

  return data;
};

// ❌ DELETE SUBJECT
export const deleteSubjectRequest = async (id: number, token: string) => {
  const response = await fetch(`${API_URL}/subjects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error al eliminar");
  }
};

// 📥 GET ACTIVITIES POR SUBJECT
export const getActivitiesRequest = async (
  subjectId: number,
  token: string,
) => {
  const response = await fetch(`${API_URL}/activities/${subjectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener tareas");
  }

  return data;
};

// ➕ CREAR ACTIVITY
export const createActivityRequest = async (
  subjectId: number,
  title: string,
  token: string,
) => {
  const response = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      subject_id: subjectId,
      title,
      description: "",
      status: "pending",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear tarea");
  }

  return data;
};

// ❌ DELETE ACTIVITY
export const deleteActivityRequest = async (id: number, token: string) => {
  const response = await fetch(`${API_URL}/activities/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error al eliminar tarea");
  }
};
