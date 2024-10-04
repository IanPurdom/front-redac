import {  Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../models/comment';
import { Audit } from '../../../models/audit';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import moment from 'moment';

@Component({
  selector: 'app-comment-show',
  templateUrl: './comment-show.component.html',
  styleUrl: './comment-show.component.scss',
})
export class CommentShowComponent {
  comment?: Comment;
  audits?: Audit[];
  user?: User | null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private commentService: CommentService
  ){
    this.authService.user$.subscribe((res: User | null) => {
      this.user = res;
    })

    this.route.params.subscribe(params=> {
      this.commentService.getComment(params['id']).subscribe((res: Comment) => {
        this.comment = res;
        this.audits = res.audits;
        console.log(this.comment)
      })
    })
  }

  updateStatus(status: string, id: string, answer?: boolean) {
    this.commentService.updateComment(status, id, this.user!.id).subscribe((res: any) => {
      if(!answer){
        this.comment!.status = status;
      }else{
        this.comment!.answers.find((a:Comment)=> {
          if(a.id===id)
            a.status = status;
        })
      }
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

  dateFormat(datetime?: Date): string {
    return `${moment(datetime).format('DD/MM/YY à HH:MM')}`
  }

  colorStatus(status?: string): string {
    const translation: any = {
      'published': 'text-primary',
      'pending': 'text-secondary',
      'refused': 'text-danger'
    }
    
    return translation[status!];
  } 
}
