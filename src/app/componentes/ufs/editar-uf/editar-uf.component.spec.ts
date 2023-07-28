import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUfComponent } from './editar-uf.component';

describe('EditarUfComponent', () => {
  let component: EditarUfComponent;
  let fixture: ComponentFixture<EditarUfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarUfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
