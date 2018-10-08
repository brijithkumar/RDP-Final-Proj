import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchParentTaskComponent } from './search-parent-task.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { HttpClientModule } from '@angular/common/http';
import { ParentTaskFilterPipe } from '../../filters/parent-task-filter.pipe';

describe('SearchParentTaskComponent', () => {
  let component: SearchParentTaskComponent;
  let fixture: ComponentFixture<SearchParentTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchParentTaskComponent,ParentTaskFilterPipe ],
      imports:[FormsModule,HttpClientModule],
      providers:[DialogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchParentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
