import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../DTOs/Account/CurrentUserDTO';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user: CurrentUser = null;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(res => {
      this.user = res;
    })
  }
}
