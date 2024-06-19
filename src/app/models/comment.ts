export interface Comment {
  id: string,
  date: Date, 
  author: string,
  text: string,
  status: string,
  answers: Comment[]
}
 