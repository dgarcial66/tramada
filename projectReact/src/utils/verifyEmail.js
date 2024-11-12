function verifyEmail(email) {
  const rex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const isEmail = rex.test(email);

  if (isEmail) {
    return true;
  } else {
    return false;
  }
}

export { verifyEmail };
