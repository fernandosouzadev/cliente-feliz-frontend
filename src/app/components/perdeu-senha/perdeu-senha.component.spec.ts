import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdeuSenhaComponent } from './perdeu-senha.component';

describe('PerdeuSenhaComponent', () => {
  let component: PerdeuSenhaComponent;
  let fixture: ComponentFixture<PerdeuSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerdeuSenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdeuSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
