import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { format } from 'date-fns-jalali';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService) { }
  order: any;
  orderdetail: any;
  sumOrder: number = 0;
  Maliat: number = 0;
  ErsalPrice: number = 20000;
  FinalSum: number = 0;
  ngOnInit(): void {
    this.GetData();
  }
  GetData() {
    this.order = this.orderService.GetAllNotSentOrders().subscribe(res => {
      this.order = res.data;
      if (this.order) {
        this.order.forEach(item => {
          item.paymentDate = format(new Date(item.paymentDate), "yyyy-MM-dd");
        });
      }

      console.log(this.order);

    })
  }
  GetOrderListById(id) {
    this.sumOrder = 0;
    this.Maliat = 0;
    this.orderService.GetOrderListById(id).subscribe(res => {
      this.orderdetail = res.data;
      if (this.orderdetail.length == 0) {
        this.orderdetail = null;
      }
      else {
        for (let i = 0; i < this.orderdetail.length; i++) {

          this.sumOrder += this.orderdetail[i].price * this.orderdetail[i].count;
        };
        this.Maliat = this.sumOrder * 0.09;

        this.FinalSum = this.sumOrder + this.Maliat;

      }

    })
  }
  ProductSent(id) {
    Swal.fire({
      title: "آیا از ارسال شدن بسته اطمینان دارید؟",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "بله ارسال شد",
      denyButtonText: `پشیمان شدم`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.orderService.SetOrderSent(id).subscribe(res => {
          if (res.status == "success") {
            Swal.fire("باموفقیت ثبت شد", "", "success");
            this.GetData();
            this.orderdetail = null;
          }
        })
      } else if (result.isDenied) {
        Swal.fire("پس هیچی", "", "info");
      }
    });
  }
}
