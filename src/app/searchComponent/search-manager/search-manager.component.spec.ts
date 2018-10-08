import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SearchManagerComponent } from './search-manager.component';
import { FormsModule } from '@angular/forms';
import { ManagerFilterPipe } from '../../filters/manager-filter.pipe';
import { DialogService } from 'ng2-bootstrap-modal';

describe('SearchManagerComponent', () => {
  let component: SearchManagerComponent;
  let fixture: ComponentFixture<SearchManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchManagerComponent,ManagerFilterPipe ],
      imports:[FormsModule,HttpClientModule],
      providers:[DialogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
