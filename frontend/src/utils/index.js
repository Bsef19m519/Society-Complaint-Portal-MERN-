function getHeader() {
  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  return headers;
}

export default getHeader;
