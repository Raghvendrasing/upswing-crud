import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableCrudChartComponent } from './feature/table-crud-chart/table-crud-chart.component';

const routes: Routes = [
  {path:'', component:TableCrudChartComponent},
  {path:'table-crud-chart', component:TableCrudChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
