import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBairroComponent } from './listar-bairro.component';

describe('ListarBairroComponent', () => {
  let component: ListarBairroComponent;
  let fixture: ComponentFixture<ListarBairroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarBairroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarBairroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
