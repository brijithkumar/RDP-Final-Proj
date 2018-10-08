import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchProjectComponent } from './search-project.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProjectFilterPipe } from '../../filters/project-filter.pipe';
import { DialogService } from 'ng2-bootstrap-modal';

describe('SearchProjectComponent', () => {
  let component: SearchProjectComponent;
  let fixture: ComponentFixture<SearchProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProjectComponent,ProjectFilterPipe ],
      imports:[FormsModule,HttpClientModule],
      providers:[DialogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
