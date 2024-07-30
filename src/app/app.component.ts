import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CurrentUser } from './DTOs/Account/CurrentUserDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private Authservice: AuthService) { }
  ngOnInit(): void {
    this.Authservice.checkUserAuth().subscribe(res => {
      
      if (res.status === "success") {
        const user = new CurrentUser(res.data.userId, res.data.firstname, res.data.lastname, res.data.address, res.data.email, res.data.phone);
        //برای اینکه پس از رفرش کارنت یوزرمون نپره این کار را کردیم که میاد بررسی میکند کاربر احراز هست و اگر هست ست میکنه
        this.Authservice.setCurrentUser(user);
      }

    });
  }
  title = 'AdminPanel';
}
