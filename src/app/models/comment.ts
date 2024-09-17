export interface Comment {
  id: string,
  date: Date, 
  author: string,
  text: string,
  status: string,
  image_url: string,
  article_id: string,
  article_title: string,
  answers: Comment[]
}
 