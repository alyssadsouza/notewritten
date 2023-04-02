import fs from 'fs';
import convertToHTML from 'markdown-to-html-converter';
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

const helloworld = `
# Hello World

This is a test file to simulate what files will look like in the text editor.

## Header 2

Here is a list for brevity:

- Item 1
- Item 2
  - Sub-item 2
- Item 3

### Header 3

And this is some more detail about Header 2.

Here's inline code: \`cool\`

Here's a code block:

\`\`\`
console.log("Hello!");
\`\`\`

`;

export const getFile = async (id: string) : Promise<File> => {
  // const files = idToFilename as {[key: string]: string};
  // const filepath = files[id];
  let content = convertToHTML(helloworld);

  // fs.readFile(filepath, () => (err: string, data: string) => {
  //   if (err) {
  //       throw err;
  //   }
  //   content = data;
  // });

  return {
    id,
    content,
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
