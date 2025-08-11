import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-proveedores',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-proveedores.html',
  styleUrls: ['./search-proveedores.css']
})
export class SearchProveedoresComponent {
  searchText: string = '';
  
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.searchText);
  }
}
