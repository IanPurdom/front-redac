import { Ad } from "./ad";
import { Comment } from "./comment";

export interface Article {
  id?: string,
  title: string | null,
  chapeau: string | null,
  subtitle: string | null,
  created_at?: Date,
  published_at?: Date,
  source?: string,
  tags?: string[],
  comments_count?: number,
  last_comment?: Date,
  image_url?: string | null,
  text: string | null,
  files?: string[],
  links?: Article[],
  ads?: Ad[],
  comments?: Comment[],
  status?: string,
  head_tag?: string
}
