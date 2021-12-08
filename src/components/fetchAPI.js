export async function fetchAPI(field, metadata) {
  // const res = await fetch(`http://localhost:5000/${field}`, metadata);
  let res = localStorage.getItem(`${field}`);
  // console.log("res", res);
  let data = await JSON.parse(res);
  let id = 1;
  data.map((_data) => {
    id = Math.max(_data.id + 1, id);
  });
  // console.log("id:", id);
  // console.log("data", data);
  // console.log("metadata", metadata);
  if (metadata.method === "GET") {
    return new Promise((resolve, reject) => {
      try {
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  } else if (metadata.method === "POST") {
    metadata.body = JSON.parse(metadata.body);
    data.push(metadata.body);
    localStorage.setItem(`${field}`, JSON.stringify(data));
    return data;
  } else if (metadata.method === "DELETE") {
    data = data.filter((_data) => {
      return _data.id !== metadata.id;
    });
    localStorage.setItem(`${field}`, JSON.stringify(data));
    return { status: 200 };
  } else {
    return id;
  }
}
