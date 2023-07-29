import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMunicipioComponent } from './listar-municipio.component';

describe('ListarMunicipioComponent', () => {
  let component: ListarMunicipioComponent;
  let fixture: ComponentFixture<ListarMunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMunicipioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
