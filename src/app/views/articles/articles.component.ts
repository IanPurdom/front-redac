import { Component } from "@angular/core";
import { ArticleService } from "../../services/article.service";
import { Article } from "../../models/article";
import moment from 'moment';
import { Observable } from "rxjs";
import { map } from "rxjs";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})

export class ArticlesComponent {
  public articles?: Article[];
  public pageNumber: number = 1;
  public status?: string;
  
  constructor(
    private articleService: ArticleService 
  ){
    this.getArticles();
  }

  getArticles(page?: number, status?: string) {
    this.status = status;
    this.articleService.getArticles(page, this.status).subscribe({
      next: (res: Article[]) => {
        this.pageNumber = page ? page : 1
        this.articles = res;
      },
      error: (err: Error) => console.log('error front articles:', err)
    })
  }

  dateFormat(datetime?: Date) {
    return `Le ${moment(datetime).format('DD/MM/YYYY à HH:MM')}`
  }

  statusTranslated(status?: string): string {
    const translation: any = {
      'published': 'Publié',
      'pending': 'En cours'
    }

    return translation[status!];
  }
}