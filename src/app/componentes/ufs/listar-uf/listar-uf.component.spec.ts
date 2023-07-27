import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUfComponent } from './listar-uf.component';

describe('ListarUfComponent', () => {
  let component: ListarUfComponent;
  let fixture: ComponentFixture<ListarUfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarUfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
