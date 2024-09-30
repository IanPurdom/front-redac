import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-search-tool',
  templateUrl: './search-tool.component.html',
  styleUrl: './search-tool.component.scss',
})
export class SearchToolComponent {
  displayAdds: Boolean = false;
  @Output() updateItemsEvent = new EventEmitter<{type: string, items: any[]}>();
  @Input() allItems?:any;
  @Input() items?: any[] = [];
  @Input() type!: string; 
  typesName: any = {'ad': 'Publicités', 'article': 'Liens articles', 'tag': 'Tags'}

  constructor(
    private articleService: ArticleService
  ){}

  addItem(item: any) {
    this.items?.push(item);
    this.items = [ ...new Set(this.items) ];
    this.displayAdds = false;
    this.updateItemsEvent.emit({type: this.type, items: this.items});
  }

  removeItem(item: any) {
    this.items = this.items!.filter((i) => i.id !== item.id);
    this.updateItemsEvent.emit({type: this.type, items: this.items});
  }

  searchItems(event: Event) {
    this.articleService.searchItems((event.target as HTMLInputElement).value, this.type).subscribe(
     (res: any[]) => {
       this.allItems = res;
    })
   }

   toggleDisplayAllItems() {
    if (!this.displayAdds){
      this.displayAdds = true;
    }else {
      this.displayAdds = false;
    }
  }
}
