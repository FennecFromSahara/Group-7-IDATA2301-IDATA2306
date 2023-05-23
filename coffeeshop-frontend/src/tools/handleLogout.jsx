import { deleteAuthorizationCookies } from "./authentication";

export default function handleLogout() {
  deleteAuthorizationCookies();
  window.location.reload();
}
