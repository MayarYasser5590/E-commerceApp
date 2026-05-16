import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { beforeEach } from 'vitest';

setupTestBed();

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot()],
    providers: [
      provideRouter([]),
      MessageService,
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(convertToParamMap({})),
        },
      },
    ],
  });
});
