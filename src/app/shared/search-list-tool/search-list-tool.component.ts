import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-list-tool',
  templateUrl: './search-list-tool.component.html',
  styleUrl: './search-list-tool.component.scss',
})
export class SearchListToolComponent {
  @Output() searchItemsEvent = new EventEmitter<{search: string, status: string}>();
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ){

    this.searchForm = this.formBuilder.group({
      search: '',
      status: ''
    })

    this.onChanges()
  }

  onChanges(): void {
   this.searchForm.valueChanges.subscribe(() => {
    this.searchItemsEvent.emit(this.searchForm.value);
   })
  }
}
