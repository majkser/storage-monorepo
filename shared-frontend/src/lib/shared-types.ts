export interface File {
  id: string;
  fileName: string;
  originalName: string;
  size: number;
  mimetype: string;
  createdAt: string;
  category: string;
}

export interface User {
  id: string;
  isAdmin: boolean;
  username: string;
  email: string;
  photo: string;
}
