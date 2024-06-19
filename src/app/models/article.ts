import { Ad } from "./ad";
import { Comment } from "./comment";

export interface Article {
  id: string,
  title: string,
  subtitle: string,
  created_at: Date,
  source: string,
  tags: string[],
  comments_count: number,
  last_comment: Date,
  image_url: string,
  text: string,
  files: string[],
  links: Article[],
  ads: Ad[],
  comments: Comment[],
  status: string
  head_tag: string
}
