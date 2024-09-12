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
  public page: number = 1;
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
        this.page = page ? page : 1
        this.articles = res;
      },
      error: (err: Error) => console.log('error front articles:', err)
    })
  }

  searchArticles(search: string){
    this.page = 1;
    this.articleService.searchArticles(search, this.page, this.status).subscribe((res: Article[]) => {
      this.articles = res;
    })
  }

  dateFormat(datetime?: Date) {
    return `${moment(datetime).format('DD/MM/YYYY à HH:MM')}`
  }

  statusTranslated(status?: string): string {
    const translation: any = {
      'published': 'Publié',
      'draft': 'En cours'
    }

    return translation[status!];
  }
}