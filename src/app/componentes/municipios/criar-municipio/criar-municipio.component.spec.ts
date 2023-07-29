import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarMunicipioComponent } from './criar-municipio.component';

describe('CriarMunicipioComponent', () => {
  let component: CriarMunicipioComponent;
  let fixture: ComponentFixture<CriarMunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarMunicipioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
