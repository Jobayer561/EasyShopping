const isAdmin = (s) => {
  if (s && s.toLowerCase() === "admin") {
    return true;
  }

  return false;
};

export default isAdmin;
