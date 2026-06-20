import { Component, input, output } from '@angular/core';
import { LibButton } from '../../atoms/lib-button/lib-button';
import { LucideAngularModule, Plus, Pencil, Trash2 } from 'lucide-angular';

export interface TableColumn<T = any> {
  field: keyof T & string;
  header: string;
  formatter?: (value: any, row: T) => string;
}

@Component({
  selector: 'lib-app-table-organism',
  templateUrl: './app-table-organism.html',
  imports: [LibButton, LucideAngularModule],
})
export class AppTableOrganism<T extends { _id: string }> {
  columns = input.required<TableColumn<T>[]>();
  data = input.required<T[]>();
  edit = output<string>();
  delete = output<string>();

  icons = {
    Plus,
    Pencil,
    Trash2,
  };

  onEdit(id: string) {
    this.edit.emit(id);
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
