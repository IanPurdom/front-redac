import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent {
  html: string = "Ceci est un test !";

  articleForm = new FormGroup({
    title: new FormControl(""),
    content: new FormControl("")
  })

  public onSubmit() {
    console.log(this.articleForm.value.content)
  }
}
