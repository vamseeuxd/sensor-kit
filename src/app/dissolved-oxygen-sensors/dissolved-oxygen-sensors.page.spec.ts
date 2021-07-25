import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DissolvedOxygenSensorsPage } from './dissolved-oxygen-sensors.page';

describe('DissolvedOxygenSensorsPage', () => {
  let component: DissolvedOxygenSensorsPage;
  let fixture: ComponentFixture<DissolvedOxygenSensorsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DissolvedOxygenSensorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DissolvedOxygenSensorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
