import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderRecordPage } from './order-record.page';

describe('OrderRecordPage', () => {
  let component: OrderRecordPage;
  let fixture: ComponentFixture<OrderRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRecordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
