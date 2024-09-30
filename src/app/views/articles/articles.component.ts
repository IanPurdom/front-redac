import { Component } from "@angular/core";
import { ArticleService } from "../../services/article.service";
import { Article } from "../../models/article";
import moment from 'moment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})

export class ArticlesComponent {
  articles?: Article[];
  currentPage: number = 1;
  totalPages?: number;
  status?: string;
  
  constructor(
    private articleService: ArticleService 
  ){
    this.getArticles();
  }

  getArticles(foo?: { search?: string, status: string }) {
    this.status = foo?.status;
    this.articleService.getArticles(this.currentPage, this.status, foo?.search).subscribe({
      next: (res: any) => {
        this.articles = res.articles;
        this.totalPages = res.totalPages;
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

  loadNextPage(nextPage: number) {
    this.currentPage = nextPage;
    this.getArticles();
  }

  getClassColor(status: string): string {
    const color: any =  { 'published': 'btn-primary btn', 
                          'pending': 'btn-warning btn',
                          'draft': 'btn-secondary btn' }
      
    return color[status]
  }
}