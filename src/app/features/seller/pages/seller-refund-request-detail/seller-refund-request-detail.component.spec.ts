import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRefundRequestDetailComponent } from './seller-refund-request-detail.component';

describe('SellerRefundRequestDetailComponent', () => {
  let component: SellerRefundRequestDetailComponent;
  let fixture: ComponentFixture<SellerRefundRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerRefundRequestDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerRefundRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
