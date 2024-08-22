import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './views/header/header.component';
import { ArticleCreateComponent } from './views/articles/article-create/article-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from "@tinymce/tinymce-angular";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SignupComponent } from './auth/signup/signup.component';
import { UsersComponent } from './views/users/users.component';
import { userService } from './services/user.service';
import { ArticleService } from './services/article.service';
import { UserUpdateComponent } from './views/users/user-update/user-update.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticleCreateComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    SignupComponent, 
    UsersComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, 
    ReactiveFormsModule,
    EditorModule,
    HttpClientModule, 
  ],
  providers: [
    userService,
    ArticleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
