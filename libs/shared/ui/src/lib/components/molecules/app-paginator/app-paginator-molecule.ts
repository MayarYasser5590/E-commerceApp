import { Component, input, output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorState } from 'primeng/types/paginator';

@Component({
  selector: 'lib-app-paginator-molecule',
  imports: [PaginatorModule],
  templateUrl: './app-paginator-molecule.html',
})
export class AppPaginatorMolecule {
  rows = input.required<number>();
  totalRecords = input.required<number>();
  page = input.required<number>();
  pageChange = output<PaginatorState>();
}
