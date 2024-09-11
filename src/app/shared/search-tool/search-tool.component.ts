import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Ad } from '../../models/ad';

@Component({
  selector: 'app-search-tool',
  templateUrl: './search-tool.component.html',
  styleUrl: './search-tool.component.scss',
})
export class SearchToolComponent {
  displayAdds: Boolean = false;
  @Output() updateAdsEvent = new EventEmitter<{type: string, items: any[]}>();
  @Input() allItems?: any[];
  @Input() items?: any[];
  @Input() type!: string; 

  constructor(
    private articleService: ArticleService
  ){}

  addItem(ad: Ad) {
    this.items?.push(ad);
    this.items = [ ...new Set(this.items) ];
    this.displayAdds = false;
    this.updateAdsEvent.emit({type: this.type, items: this.items});
  }

  removeItem(ad: Ad) {
    this.items = this.items!.filter((a) => a.id !== ad.id);
    this.updateAdsEvent.emit({type: this.type, items: this.items});
  }

  searchItems(event: Event) {
    this.articleService.searchItems((event.target as HTMLInputElement).value, this.type).subscribe(
     (res: any[]) => {
      console.log(res);
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
