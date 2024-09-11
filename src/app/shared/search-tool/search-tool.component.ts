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
  @Output() updateAdsEvent = new EventEmitter<Ad[]>();
  @Input() allAds?: Ad[];
  @Input() ads?: Ad[];

  constructor(
    private articleService: ArticleService
  ){}

  addAd(ad: Ad) {
    this.ads?.push(ad);
    this.ads = [ ...new Set(this.ads) ];
    this.displayAdds = false;
    this.updateAdsEvent.emit(this.ads);
  }

  removeAd(ad: Ad) {
    this.ads = this.ads!.filter((a) => a.id !== ad.id);
    this.updateAdsEvent.emit(this.ads);
  }

  searchAds(event: Event) {
    this.articleService.searchAds((event.target as HTMLInputElement).value).subscribe(
     (res: any[]) => {
       this.allAds = res;
    })
   }

   toggleDisplayAllAds() {
    if (!this.displayAdds){
      this.displayAdds = true;
    }else {
      this.displayAdds = false;
    }
  }
}
