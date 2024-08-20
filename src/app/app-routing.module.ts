import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './views/articles/articles.component';
import { ArticleCreateComponent } from './views/articles/article-create/article-create.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UsersComponent } from './views/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/new', component: ArticleCreateComponent},
  { path: 'account', component: UsersComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
