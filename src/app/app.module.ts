import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TableComponent } from './core/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import { TableCrudChartComponent } from './feature/table-crud-chart/table-crud-chart.component';
import { DatePipe } from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableCrudChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    NgxChartsModule,
    TooltipModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CalendarModule,
    DropdownModule,
    RadioButtonModule,
    DialogModule,
    ToastModule
  ],
  providers: [
    DatePipe,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
