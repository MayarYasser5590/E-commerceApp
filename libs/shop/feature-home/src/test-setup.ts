import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { APP_CONFIG } from '@shop-workspace/shared-util';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { beforeEach } from 'vitest';

setupTestBed();

export const testAppConfig = {
  apiUrl: 'https://example.test/api/v1',
  production: false,
  appName: 'test',
};

export const appConfigProvider = {
  provide: APP_CONFIG,
  useValue: testAppConfig,
};

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      appConfigProvider,
      provideHttpClient(),
      provideHttpClientTesting(),
      provideRouter([]),
      MessageService,
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(convertToParamMap({ id: 'product-1' })),
        },
      },
    ],
  });
});
