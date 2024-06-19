import { Component } from "@angular/core";
import { ArticleService } from "../../services/article.service";
import { Article } from "../../models/article";
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})

export class ArticlesComponent {
  public articles?: Article[];
  
  constructor(
    private articleService: ArticleService 
  ){
    this.articleService.getArticles().subscribe({
      next: (res: Article[]) => {
        this.articles = res;
      },
      error: (err: Error) => console.log('error front articles:', err)
    })
  }
}