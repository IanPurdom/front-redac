import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Output() NextPageEvent = new EventEmitter<number>();
  @Input() currentPage?: number;
  @Input() totalPages?: number

  constructor(){
  }

  changePage(nextPage: number) {
    this.currentPage = nextPage;
    console.log(this.currentPage)
    this.NextPageEvent.emit(nextPage);
  }
}
