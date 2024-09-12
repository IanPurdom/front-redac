import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-list-tool',
  templateUrl: './search-list-tool.component.html',
  styleUrl: './search-list-tool.component.scss',
})
export class SearchListToolComponent {
  @Output() searchItemsEvent = new EventEmitter<string>();

  searchItems(event: Event) {
    this.searchItemsEvent.emit((event.target as HTMLInputElement).value)
  }
}
