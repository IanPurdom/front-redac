import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './views/articles/articles.component';
import { ArticleCreateComponent } from './views/articles/article-create/article-create.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UsersComponent } from './views/users/users.component';
import { UserUpdateComponent } from './views/users/user-update/user-update.component';
import { ResetPwComponent } from './auth/reset-pw/reset-pw.component';
import { ArticleShowComponent } from './views/articles/article-show/article-show.component';
import { CommentsComponent } from './views/comments/comments.component';
import { CommentShowComponent } from './views/comments/comment-show/comment-show.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/new', component: ArticleCreateComponent},
  { path: 'articles/:id', component: ArticleShowComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'comments/:id', component: CommentShowComponent },
  { path: 'users', component: UsersComponent},
  { path: 'users/:id/update', component: UserUpdateComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset', component: ResetPwComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
