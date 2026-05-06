import { User } from "../types/User";
import { ActivityService } from "./ActivityService";
import { AuthService } from "./AuthService";
import { EventService } from "./EventService";
import { SubjectService } from "./SubjectService";
import { UserService } from "./UserService";

export * from "./ApiClient";
export {
  ActivityService,
  AuthService,
  EventService,
  SubjectService,
  UserService
};

export const loginRequest = AuthService.login;
export const registerRequest = AuthService.register;
export const getUserProfileRequest = UserService.getProfile;
export const updateUserProfileRequest = (
  token: string,
  userId: number,
  userData: Partial<User>,
) => UserService.updateProfile(token, userId, userData);

export const getSubjectsRequest = SubjectService.getSubjects;
export const getSubjectRequest = SubjectService.getSubject;
export const createSubjectRequest = SubjectService.createSubject;
export const updateSubjectRequest = SubjectService.updateSubject;
export const deleteSubjectRequest = SubjectService.deleteSubject;

export const getActivitiesRequest = ActivityService.getActivities;
export const getActivitiesBySubjectRequest =
  ActivityService.getActivitiesBySubject;
export const getActivityRequest = ActivityService.getActivity;
export const createActivityRequest = ActivityService.createActivity;
export const updateActivityRequest = ActivityService.updateActivity;
export const deleteActivityRequest = ActivityService.deleteActivity;

export const getEventsRequest = EventService.getEvents;
export const getEventRequest = EventService.getEvent;
export const createEventRequest = EventService.createEvent;
export const updateEventRequest = EventService.updateEvent;
export const deleteEventRequest = EventService.deleteEvent;
