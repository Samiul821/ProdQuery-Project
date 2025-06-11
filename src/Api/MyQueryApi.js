export const myQueryPromise = (email) => {
  return fetch(`http://localhost:5000/myQuery?email=${email}`).then((res) =>
    res.json()
  );
};
