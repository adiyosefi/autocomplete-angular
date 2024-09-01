import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWithBrownHairComponent } from './users-with-brown-hair.component';

describe('UsersWithBrownHairComponent', () => {
  let component: UsersWithBrownHairComponent;
  let fixture: ComponentFixture<UsersWithBrownHairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersWithBrownHairComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersWithBrownHairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
