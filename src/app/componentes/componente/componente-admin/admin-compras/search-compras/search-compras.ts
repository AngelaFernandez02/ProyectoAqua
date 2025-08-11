import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-compras',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-compras.html',
  styleUrl: './search-compras.css'
})
export class SearchCompras {
  searchText: string = '';
  
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.searchText);
  }

}