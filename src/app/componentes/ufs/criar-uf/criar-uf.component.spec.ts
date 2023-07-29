import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarUfComponent } from './criar-uf.component';

describe('CriarUfComponent', () => {
  let component: CriarUfComponent;
  let fixture: ComponentFixture<CriarUfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarUfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
