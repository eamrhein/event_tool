export async function fetchUser(token) {
  let promise = await fetch(`https://www.eventbriteapi.com/v3/users/me/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await promise.json();
}
export async function fetchOrgs(id, token) {
  let promise = await fetch(
    `https://www.eventbriteapi.com/v3/users/${id}/organizations/?token=${token}`
  );
  return await promise.json();
}
