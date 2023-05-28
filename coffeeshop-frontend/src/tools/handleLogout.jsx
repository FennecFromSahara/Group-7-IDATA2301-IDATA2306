import { deleteAuthorizationCookies } from "./authentication";

/**
 * Logs out a user from the website.
 */
export default function handleLogout() {
  deleteAuthorizationCookies();
  window.location.reload();
}
