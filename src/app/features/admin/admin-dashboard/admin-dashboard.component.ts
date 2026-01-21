import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Montly Sales (₺)',
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.6)',
        borderWidth: 1
      }
    ]
  };

  public lineChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
      this.orderService.getMonthlySales().subscribe(res => {
        if (res.status === 200 && res.payload) {
          this.lineChartData.labels = Object.keys(res.payload);
          this.lineChartData.datasets[0].data = Object.values(res.payload);

          this.chart?.update();
        }
      });
  }
}
