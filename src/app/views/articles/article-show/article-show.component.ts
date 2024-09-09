import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Article } from '../../../models/article';
import { ActivatedRoute } from '@angular/router';
import { TinyEditorComponent } from '../../../shared/tiny-editor/tiny-editor.component';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-show.component.html',
  styleUrls: ['./article-show.component.scss'],
})
export class ArticleShowComponent {
  article?: Article;

  articleForm = new FormGroup({
    title: new FormControl(""),
    content: new FormControl("")
  })
  @ViewChild('tinyEditor') tinyEditor!: TinyEditorComponent; 

  constructor(
    private route: ActivatedRoute
  ){}

  ngAfterViewInit() {
    this.route.params.subscribe((params) => {
        this.tinyEditor.getArticle(params['id']);
      })
  }
}
