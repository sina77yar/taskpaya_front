import { Injectable } from '@angular/core';
import { RegisterUserDTO } from '../DTOs/Account/RegisterUserDTO';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUserDTO } from '../DTOs/Account/LoginUserDTO';
import { CurrentUser } from '../DTOs/Account/CurrentUserDTO';
import { ICheckUserAuthResult } from '../DTOs/Account/ICheckUserAuthResult';
import { EditUserDTO } from '../DTOs/Account/EditUserDTO';
import { changePassDTO } from '../DTOs/Account/changePassDTO';
import { IResponseResult } from '../DTOs/Common/IResponseResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private currentUser:CurrentUser;
  private currentUser: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null);

  constructor(
    private http: HttpClient
  ) {

  }
  setCurrentUser(user: CurrentUser): void {
    this.currentUser.next(user);
  }
  getCurrentUser(): Observable<CurrentUser> {
    return this.currentUser;
  }
  registerUser(registerData: RegisterUserDTO): Observable<any> {
    return this.http.post<any>('api/Account/register', registerData)
  }
  loginUser(registerData: LoginUserDTO): Observable<any> {
    return this.http.post<any>('api/AdminAccount/loginadmin', registerData)
  }
  checkUserAuth(): Observable<ICheckUserAuthResult> {
    return this.http.post<ICheckUserAuthResult>("api/account/check-auth", null);
  }
  logOutUser(): Observable<any> {
    return this.http.get('api/account/sign-out')
  }
  editUser(EditData: EditUserDTO): Observable<any> {
    return this.http.post<any>('api/Account/EditUser', EditData)
  }
  changePass(EditData: changePassDTO): Observable<any> {
    return this.http.post<any>('api/Account/ChangeUserPassword', EditData)
  }

  GetAllCustomers(): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/Users/GetAllCustomers');
}
}
