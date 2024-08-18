import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrentUser } from '../../DTOs/Account/CurrentUserDTO';
import { LoginUserDTO } from '../../DTOs/Account/LoginUserDTO';
import { DomainName } from '../../Utilities/PathTools';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private _router: Router,
    private cookieService: CookieService
  ) {

  }
  public loginForm: FormGroup;
  user: CurrentUser = null;
  @ViewChild('usernotfoundSwal')
  public readonly usernotfoundSwal: SwalComponent;
  @ViewChild('userfoundSwal')
  public readonly userfoundSwal: SwalComponent;

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe(res => {
      this.user = res;
    })
    this.loginForm = new FormGroup({
      Password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      Phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
    })
  }
  SubmitLoginForm() {

    var loginData = new LoginUserDTO(
      this.loginForm.controls['Password'].value,
      this.loginForm.controls['Phone'].value,)

    this.authservice.loginUser(loginData).subscribe(res => {
      if (res.status == "NotFound" || res.status == "NotAdmin") {
        this.usernotfoundSwal.fire();
      }
      const currentUser = new CurrentUser(
        res.data.userid,
        res.data.firstname,
        res.data.lastname,
      );
      console.log(currentUser);

      this.authservice.setCurrentUser(currentUser);
      this.authservice.getCurrentUser().subscribe(res => {
      })
      this.cookieService.set("tabagallery-cookie", res.data.token, res.data.expireTime * 60)
      this._router.navigate(['products'])
    })

  }
}