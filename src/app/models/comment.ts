import { Audit } from "./audit";

export interface Comment {
  id: string,
  date: Date, 
  author: string,
  text: string,
  status: string,
  image_url: string,
  article_id: string,
  article_title: string,
  parent_id: string,
  answers: Comment[],
  audits: Audit[]
}
 