import { TestBed } from '@angular/core/testing';

import { SettingdataService } from './settingdata.service';

describe('SettingdataService', () => {
  let service: SettingdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
