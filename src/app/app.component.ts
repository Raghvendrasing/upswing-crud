import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upswing-crud';
  products=[
    {
      name:'abc',
      code:'1',
      category:'xyz',
      quantity:123
    }
  ]

  single: any[] = [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    }
    // Add more data as needed
  ];

  view: [number, number] = [700, 400]; // Adjust the chart dimensions as needed

  // Optional: Customize appearance
  colorScheme:any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // Optional: Customize axis labels and visibility
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Population';

  // Optional: Customize gradient
  gradient = false;

}
