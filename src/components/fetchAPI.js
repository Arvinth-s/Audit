export async function fetchAPI(field, metadata) {
  // const res = await fetch(`http://localhost:5000/${field}`, metadata);
  let res;
  try {
    res = localStorage.getItem(`${field}`);
  } catch (e) {
    console.log("error", e);
    localStorage.setItem(`${field}`, JSON.stringify("[]"));
    res = localStorage.getItem(`${field}`);
  }
  let id = 1;
  let data = [];
  if (!res || res === '"[]"') {
    localStorage.setItem(`${field}`, JSON.stringify("[]"));
    res = localStorage.getItem(`${field}`);
  } else {
    data = await JSON.parse(res);
    data.map((_data) => {
      id = Math.max(_data.id + 1, id);
    });
  }

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
