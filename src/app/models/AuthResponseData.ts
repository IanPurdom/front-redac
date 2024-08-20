export interface AuthResponseData {
  email: string,
  role: string,
  status: string, 
  createdAt: Date,
  expiresIn: number;
  authenticationToken: string;
}