import { Component } from "@angular/core";
import { ArticleService } from "../../services/article.service";
import { Article } from "../../models/article";
import moment from 'moment';

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

  getArticles(foo?: { search?: string, status: string }) {
    this.status = foo?.status;
    this.articleService.getArticles(this.page, this.status, foo?.search).subscribe({
      next: (res: Article[]) => {
        this.articles = res;
      },
      error: (err: Error) => console.log('error front articles:', err)
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

  getClassColor(status: string): string {
    const color: any =  { 'published': 'btn-primary btn', 
                          'pending': 'btn-warning btn',
                          'draft': 'btn-secondary btn' }
      
    return color[status]
  }
}