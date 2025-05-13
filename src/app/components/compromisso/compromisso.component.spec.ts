import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoComponent } from './compromisso.component';

describe('CompromissoComponent', () => {
  let component: CompromissoComponent;
  let fixture: ComponentFixture<CompromissoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompromissoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompromissoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
