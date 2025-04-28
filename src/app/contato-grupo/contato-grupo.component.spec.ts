import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoGrupoComponent } from './contato-grupo.component';

describe('ContatoGrupoComponent', () => {
  let component: ContatoGrupoComponent;
  let fixture: ComponentFixture<ContatoGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatoGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
