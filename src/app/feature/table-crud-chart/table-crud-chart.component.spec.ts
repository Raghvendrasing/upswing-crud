import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCrudChartComponent } from './table-crud-chart.component';

describe('TableCrudChartComponent', () => {
  let component: TableCrudChartComponent;
  let fixture: ComponentFixture<TableCrudChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCrudChartComponent]
    });
    fixture = TestBed.createComponent(TableCrudChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
