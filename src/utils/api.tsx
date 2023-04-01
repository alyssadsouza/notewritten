export const getNotebooks = async (user: string) => {
  return [
    {
      notebook: "2A",
      files: ["note1.md", "note2.md", "note3.md"],
    },
    {
      notebook: "1B",
      files: ["note4.md", "note5.md", "note6.md"],
    },
    {
      notebook: "1A",
      files: ["note7.md", "note7.md", "note9.md"],
    },
  ];
};

export const getFile = async (id: string) => {
  return {
    id: id,
    title: "Title",
    content: "This is some content.",
  };
};

export const login = async (username: string, password: string) => {
  return "auth_token";
};
