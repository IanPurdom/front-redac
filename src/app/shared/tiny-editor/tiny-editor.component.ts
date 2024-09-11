import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Article } from '../../models/article';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Ad } from '../../models/ad';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrl: './tiny-editor.component.scss',
})    
export class TinyEditorComponent {
  allAds?: any[];
  displayAdds: Boolean = false;
  articleForm: FormGroup;
  article: Article = {title: "",
                      subtitle: "",
                      chapeau: "",
                      text: "",
                      ads: []};
  user?: User | null;

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private formBuilder: FormBuilder
  ){
    this.articleForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      subtitle: '',
      chapeau: '',
      text: ['', [Validators.required, Validators.minLength(10)]]
    })

    this.articleService.getAds().subscribe((res: Ad[]) => {
      this.allAds = res;
    })

    this.articleService.article$.pipe(
      take(1)).subscribe((res: Article) => {
      this.article = res;
      this.formFromArticle();
    })

    this.onChanges()

    this.authService.user$.subscribe((res: User | null) => {
      this.user = res;
      console.log(this.user)
    })
  }

  onChanges(): void {
    this.articleForm.valueChanges.subscribe(() => {
      console.log(this.articleFromForm());
      this.articleService.article$.next(this.articleFromForm());
    });
  }
  
  updateAds(ads: Ad[]) {
    this.article!.ads = ads;
    console.log(this.article.ads);
    this.articleService.article$.next(this.article!);
  }
  
  saveForSession() {
    this.article =  this.articleFromForm()
    this.articleService.article$.next(this.article)
  }

  getArticle(id: string) {
    this.articleService.getArticle(id).subscribe((res: Article) => {
      this.article = res;
      this.articleService.article$.next(this.article);
      this.formFromArticle();
    })
  }

  publish() {
    this.article!.status = 'published';
    this.send();
  }

  toValidate() {
    this.article!.status = 'to_validate';
    this.send();
  }
  
  save() { 
    this.article!.status = 'in_progress';
    this.send();
  }

  send() {
    this.articleService.createArticle(this.article!).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => console.log(err)
    })
  }

  articleFromForm(): Article {
    return {title: this.articleForm.get('title')?.value,
            subtitle: this.articleForm.get('subtitle')?.value!,
            chapeau: this.articleForm.get('chapeau')?.value,
            text: this.articleForm.get('text')?.value,
            ads: this.article?.ads}
  }

  formFromArticle() {
    console.log(this.article);
    this.articleForm.get('title')?.setValue(this.article?.title);
    this.articleForm.get('subtitle')?.setValue(this.article?.subtitle);
    this.articleForm.get('chapeau')?.setValue(this.article?.chapeau);
    this.articleForm.get('text')?.setValue(this.article?.text);
  }
}
