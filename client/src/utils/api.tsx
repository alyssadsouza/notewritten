import axios, { AxiosResponse } from "axios";
// @ts-ignore
import convertToHTML from "markdown-to-html-converter";
export interface User {
  email: string;
  password: string;
}

export interface Token {
  token_type: string;
  access_token: string;
}

export interface Notebook {
  id: string;
  name: string;
  user_id: string;
}

export interface Page {
  id: string;
  name: string;
  user_id: string;
  notebook_id: string;
  s3_upload_key: string;
}

export interface PageContent {
  id: string;
  name: string;
  s3_upload_key: string;
  content: string;
}

export interface NotebookPages {
  notebook: Notebook;
  pages: Page[];
}

// Set config defaults when creating the instance
const server = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return server.post(
    `/users/login`,
    {
      username: email,
      password: password,
    },
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }
  );
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

export const getNotebooks = async (token: Token): Promise<AxiosResponse> => {
  return server.get(`/notebooks/all`, {
    headers: {
      Authorization: token.token_type + " " + token.access_token,
    },
  });
};

export const getPageContent = async (
  token: Token,
  page_id: string
): Promise<AxiosResponse> => {
  return server.get(`/pages/content/${page_id}`, {
    headers: {
      Authorization: token.token_type + " " + token.access_token,
    },
  });
};

export const createPage = async (
  token: Token,
  notebook_id: string,
  name: string
): Promise<AxiosResponse> => {
  return server.post(
    `/pages/create`,
    {
      notebook_id,
      name,
    },
    {
      headers: {
        Authorization: token.token_type + " " + token.access_token,
      },
    }
  );
};

export const updatePageContent = async (
  token: Token,
  page_id: string,
  content: string
): Promise<AxiosResponse> => {
  return server.post(
    `/pages/update-content`,
    {
      page_id,
      content,
    },
    {
      headers: {
        Authorization: token.token_type + " " + token.access_token,
      },
    }
  );
};

export const deletePage = async (
  token: Token,
  page_id: string
): Promise<AxiosResponse> => {
  return server.post(
    `/pages/delete`,
    {
      page_id,
    },
    {
      headers: {
        Authorization: token.token_type + " " + token.access_token,
      },
    }
  );
};
