import { Subject } from "../types/Subject";
import { Activity, Event } from "../types/Task";
import { AuthResponse, User } from "../types/User";

const API_URL = "http://localhost:3000/api";

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Crea headers estándar para requests protegidas
 */
export const getAuthHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

/**
 * Crea headers sin token (para login/register)
 */
export const getPublicHeaders = () => ({
  "Content-Type": "application/json",
});

/**
 * Maneja errores estándar de la API
 */
const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || `HTTP ${response.status}`);
    throw error;
  }

  return data;
};

// ============================================================================
// 👤 USERS - AUTHENTICATION
// ============================================================================

/**
 * Login: envía credenciales y recibe token + usuario
 */
export const loginRequest = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response);
};

/**
 * Register: crea nuevo usuario
 */
export const registerRequest = async (
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ name, email, password }),
  });

  return handleResponse(response);
};

/**
 * Get Profile: obtiene datos del usuario actual
 */
export const getUserProfileRequest = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

/**
 * Update Profile: actualiza datos del usuario
 */
export const updateUserProfileRequest = async (
  token: string,
  userData: Partial<User>,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
};

// ============================================================================
// 📚 SUBJECTS - CRUD
// ============================================================================

/**
 * Get all subjects del usuario autenticado
 */
export const getSubjectsRequest = async (token: string): Promise<Subject[]> => {
  const response = await fetch(`${API_URL}/subjects`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

/**
 * Get single subject by ID
 */
export const getSubjectRequest = async (
  id: string,
  token: string,
): Promise<Subject> => {
  const response = await fetch(`${API_URL}/subjects/${id}`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

/**
 * Create new subject
 */
export const createSubjectRequest = async (
  subject: Omit<Subject, "id" | "userId" | "createdAt">,
  token: string,
): Promise<Subject> => {
  const response = await fetch(`${API_URL}/subjects`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(subject),
  });

  return handleResponse(response);
};

/**
 * Update existing subject
 */
export const updateSubjectRequest = async (
  id: string,
  updates: Partial<Subject>,
  token: string,
): Promise<Subject> => {
  const response = await fetch(`${API_URL}/subjects/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(updates),
  });

  return handleResponse(response);
};

/**
 * Delete subject
 */
export const deleteSubjectRequest = async (
  id: string,
  token: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/subjects/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error al eliminar materia");
  }
};

// ============================================================================
// 📝 ACTIVITIES - CRUD (Tasks)
// ============================================================================

/**
 * Get all activities
 */
export const getActivitiesRequest = async (
  token: string,
): Promise<Activity[]> => {
  const response = await fetch(`${API_URL}/activities`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

/**
 * Get activities by subject
 */
export const getActivitiesBySubjectRequest = async (
  subjectId: string,
  token: string,
): Promise<Activity[]> => {
  const response = await fetch(`${API_URL}/activities?subjectId=${subjectId}`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

/**
 * Get single activity
 */
export const getActivityRequest = async (
  id: string,
  token: string,
): Promise<Activity> => {
  const response = await fetch(`${API_URL}/activities/${id}`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

/**
 * Create new activity
 */
export const createActivityRequest = async (
  activity: Omit<Activity, "id" | "userId" | "createdAt">,
  token: string,
): Promise<Activity> => {
  const response = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(activity),
  });

  return handleResponse(response);
};

/**
 * Update activity
 */
export const updateActivityRequest = async (
  id: string,
  updates: Partial<Activity>,
  token: string,
): Promise<Activity> => {
  const response = await fetch(`${API_URL}/activities/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(updates),
  });

  return handleResponse(response);
};

/**
 * Toggle activity completion status
 */
export const toggleActivityRequest = async (
  id: string,
  token: string,
): Promise<Activity> => {
  const response = await fetch(`${API_URL}/activities/${id}/toggle`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

/**
 * Delete activity
 */
export const deleteActivityRequest = async (
  id: string,
  token: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/activities/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error al eliminar actividad");
  }
};

// ============================================================================
// 📅 EVENTS - CRUD
// ============================================================================

/**
 * Get all events
 */
export const getEventsRequest = async (token: string): Promise<Event[]> => {
  const response = await fetch(`${API_URL}/events`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

/**
 * Get events by subject
 */
export const getEventsBySubjectRequest = async (
  subjectId: string,
  token: string,
): Promise<Event[]> => {
  const response = await fetch(`${API_URL}/events?subjectId=${subjectId}`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

/**
 * Get events by date range
 */
export const getEventsByDateRequest = async (
  startDate: string,
  endDate: string,
  token: string,
): Promise<Event[]> => {
  const response = await fetch(
    `${API_URL}/events?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse(response);
};

/**
 * Get single event
 */
export const getEventRequest = async (
  id: string,
  token: string,
): Promise<Event> => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

/**
 * Create new event
 */
export const createEventRequest = async (
  event: Omit<Event, "id" | "userId" | "createdAt">,
  token: string,
): Promise<Event> => {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(event),
  });

  return handleResponse(response);
};

/**
 * Update event
 */
export const updateEventRequest = async (
  id: string,
  updates: Partial<Event>,
  token: string,
): Promise<Event> => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(updates),
  });

  return handleResponse(response);
};

/**
 * Delete event
 */
export const deleteEventRequest = async (
  id: string,
  token: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error al eliminar evento");
  }
};
