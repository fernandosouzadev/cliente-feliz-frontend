import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRealizadoComponent } from './cadastro-realizado.component';

describe('CadastroRealizadoComponent', () => {
  let component: CadastroRealizadoComponent;
  let fixture: ComponentFixture<CadastroRealizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroRealizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroRealizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
