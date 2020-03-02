import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HideHeaderDirective } from './hide-header.directive';

describe('HideHeaderDirective', () => {
  let component: HideHeaderDirective;
  let fixture: ComponentFixture<HideHeaderDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HideHeaderDirective ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HideHeaderDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
