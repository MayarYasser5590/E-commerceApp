import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule , Search } from 'lucide-angular';


@Component({
  selector: 'lib-search-input-molecule',
  imports: [InputTextModule , LucideAngularModule],
  templateUrl: './search-input-molecule.html',
  styleUrl: './search-input-molecule.scss',
})
export class SearchInputMolecule {
  @Input() placeholder = 'Search...';
@Input() widthClass = '';
  @Input() inputClass = '';
  @Output() valueChange = new EventEmitter<string>();

  value = '';
  icons = {
    Search
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }
}
