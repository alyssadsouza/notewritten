import axios, { AxiosResponse } from "axios";
// @ts-ignore
import convertToHTML from "markdown-to-html-converter";
export interface User {
  email: string;
  password: string;
}

export interface Notebook {
  id: string;
  name: string;
  files: Array<string>;
}

export interface File {
  notebook: string;
  id: string;
  content: string;
}

// Set config defaults when creating the instance
const server = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const getNotebooks = async (user_id: string): Promise<Notebook[]> => {
  let data: Notebook[] = [];

  await server
    .get(`/notebooks/${user_id}`)
    .then((response) => {
      data = JSON.parse(response.data.message);
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
};

export const getFile = async (
  user: string,
  notebook: string,
  id: string
): Promise<File> => {
  const data = {
    notebook,
    id,
    content: "",
  };

  await server
    .get(`/${user}/${notebook}/${id}`)
    .then((response) => {
      const res = JSON.parse(response.data.message);
      data.content = convertToHTML(res.content);
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
};

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return server.post(`/users/login`, {
    username: email,
    password: password,
  }, {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
};

export const register = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return server.post(`/users/register`, {
    email,
    password,
  });
};
