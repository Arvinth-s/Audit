export async function fetchAPI(field, metadata) {
  const res = await fetch(`http://localhost:5000/${field}`, metadata);
  const data = await res.json();
  return new Promise((resolve, reject) => {
    try {
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}
