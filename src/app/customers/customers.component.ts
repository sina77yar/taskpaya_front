import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { format } from 'date-fns-jalali';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  constructor(private authService: AuthService) { }
  Customers: any[] = [];
  ngOnInit(): void {
    this.GetAllCustomers();
  }
  GetAllCustomers() {
    this.authService.GetAllCustomers().subscribe(res => {
      
      this.Customers = res.data;
      this.Customers.forEach(item => {
        item.lastUpdateDate = format(new Date(item.lastUpdateDate), "yyyy/MM/dd");
      });
      console.log(res.data);
      
    })
  }
}
