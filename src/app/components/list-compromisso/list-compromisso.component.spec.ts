import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompromissoComponent } from './list-compromisso.component';

describe('ListCompromissoComponent', () => {
  let component: ListCompromissoComponent;
  let fixture: ComponentFixture<ListCompromissoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCompromissoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCompromissoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
