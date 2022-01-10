import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluffyBuyComponent } from './fluffy-buy.component';

describe('FluffyBuyComponent', () => {
  let component: FluffyBuyComponent;
  let fixture: ComponentFixture<FluffyBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluffyBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluffyBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
