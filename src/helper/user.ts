const USER_ID_KEY = "userId";

export function getUser() {
  return localStorage.getItem(USER_ID_KEY);
}

export function setUser(userId: string) {
  return localStorage.setItem(USER_ID_KEY, userId);
}
