import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../DTOs/Account/CurrentUserDTO';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  user: CurrentUser = null;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(res => {
      
      this.user = res;
    })
  }
}
