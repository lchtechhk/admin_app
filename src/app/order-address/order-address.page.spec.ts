import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderAddressPage } from './order-address.page';

describe('OrderAddressPage', () => {
  let component: OrderAddressPage;
  let fixture: ComponentFixture<OrderAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
