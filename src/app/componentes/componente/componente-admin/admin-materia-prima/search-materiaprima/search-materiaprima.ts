import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-materiaprima',
  imports: [CommonModule,FormsModule],
  templateUrl: './search-materiaprima.html',
  styleUrl: './search-materiaprima.css'
})
export class SearchMateriaprima {

   searchText: string = '';
  
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.searchText);
}

}

