export interface User {
  email: string;
  password: string;
}

export interface Notebook {
  id: number;
  name: string;
  files: Array<string>;
}

export interface File {
  id: string;
  title: string;
  content: string;
}

export const getNotebooks = async (user: User) : Promise<Notebook[]> => {
  return [
    {
      id: 0,
      name: "2A",
      files: ["note1.md", "note2.md", "note3.md"],
    },
    {
      id: 1,
      name: "1B",
      files: ["note4.md", "note5.md", "note6.md"],
    },
    {
      id: 2,
      name: "1A",
      files: ["note7.md", "note7.md", "note9.md"],
    },
  ];
};

export const getFile = async (id: string) : Promise<File> => {
  return {
    id: id,
    title: "Title",
    content: "This is some content.",
  };
};

const getUser = async (email: string, password: string) => {
  return {
    data: {
      email,
      password,
    },
  };
};

export const login = async (email: string, password: string): Promise<User> => {
  const response = await getUser(email, password);
  return response.data;
};
