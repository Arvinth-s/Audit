export async function fetchAPI(field, metadata) {
  // const res = await fetch(`http://localhost:5000/${field}`, metadata);
  let res = localStorage.getItem(`${field}`);
  console.log("res", res);
  const data = await JSON.parse(res);
  console.log("data", data);
  if (metadata.method === "GET") {
    return new Promise((resolve, reject) => {
      try {
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  } else {
    data.push(metadata.body);
    console.log("updated data");
    localStorage.setItem(`${field}`, data);
  }
}
