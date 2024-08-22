export interface AuthResponseData {
  id: string,
  email: string,
  role: string,
  status: string, 
  createdAt: Date,
  expiresIn: number;
  authenticationToken: string;
}