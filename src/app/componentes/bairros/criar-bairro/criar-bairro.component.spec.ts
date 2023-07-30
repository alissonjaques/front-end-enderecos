import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarBairroComponent } from './criar-bairro.component';

describe('CriarBairroComponent', () => {
  let component: CriarBairroComponent;
  let fixture: ComponentFixture<CriarBairroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarBairroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarBairroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
