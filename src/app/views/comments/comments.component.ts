import { Component } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import moment from 'moment';
import { Comment } from '../../models/comment';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  comments?: Comment[];
  status?: string;
  currentPage: number = 1;
  totalPages?: number;
  user!: User | null;

  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private router: Router
  ){

    this.authService.user$.subscribe((res: User | null) => {
      if(res){
        return this.user = res;
      }else{
        return undefined
      }
    })
    this.getComments();
  }

  getComments(foo?: { search?: string, status: string }) {
    this.status = foo?.status;
    this.commentService.getComments(this.currentPage, this.status, foo?.search).subscribe((res: any) => {
      this.comments = res.comments;
      this.totalPages = res.totalPages;
    })
  }

  statusTranslated(status?: string): string {
    const translation: any = {
      'published': 'Publié',
      'pending': 'En attente',
      'refused': 'Refusé'
    }

    return translation[status!];
  }

  getClassColor(status: string): string {
    const color: any =  { 'published': 'btn-primary btn', 
                          'pending': 'btn-secondary btn',
                          'refused': 'btn-danger btn' }
      
    return color[status]
  }

  dateFormat(datetime?: Date) {
    return `${moment(datetime).format('DD/MM/YY à HH:MM')}`
  }

  updateStatus(status: string, id: string) {
    this.commentService.updateComment(status, id, this.user!.id).subscribe((res: any) => {
      this.comments?.find((c:Comment) => {
        if(c.id === res.id)
          c.status = res.status;
      })
    })
  }

  loadNextPage(nextPage: number) {
    this.currentPage = nextPage;
    this.getComments();
  }

  goTo(parentId: string) {
    console.log(parentId)
    this.router.navigate(['/comments', parentId])
  }
}
