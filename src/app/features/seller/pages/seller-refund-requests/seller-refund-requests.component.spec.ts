import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRefundRequestsComponent } from './seller-refund-requests.component';

describe('SellerRefundRequestsComponent', () => {
  let component: SellerRefundRequestsComponent;
  let fixture: ComponentFixture<SellerRefundRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerRefundRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerRefundRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
