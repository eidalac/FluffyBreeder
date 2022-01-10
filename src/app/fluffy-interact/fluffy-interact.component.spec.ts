import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluffyInteractComponent } from './fluffy-interact.component';

describe('FluffyInteractComponent', () => {
  let component: FluffyInteractComponent;
  let fixture: ComponentFixture<FluffyInteractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluffyInteractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluffyInteractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
