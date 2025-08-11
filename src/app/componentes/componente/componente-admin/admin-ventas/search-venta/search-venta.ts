import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-venta',
  imports: [CommonModule,FormsModule],
  templateUrl: './search-venta.html',
  styleUrl: './search-venta.css'
})
export class SearchVenta {
    searchText: string = '';
  
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.searchText);
  }

}
