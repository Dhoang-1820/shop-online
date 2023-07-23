import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AuthenService } from 'src/app/services/authen.service';
import { BearerService } from 'src/app/services/bearer.service';
import { UserService } from 'src/app/services/user.service';
import { User, defaltImgBase64 } from '../model/User';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  userValidations: FormGroup;

  userName!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  dataLoading: boolean;

  user: User;

  constructor(private bearerService: BearerService, private auth: AuthenService, private router: Router, private userService: UserService, private messageService: MessageService) { 
    this.userValidations = new FormGroup({
      userName: new FormControl(this.userName, [Validators.required]),
      password: new FormControl(this.password, [Validators.required]),
      firstName: new FormControl(this.firstName, [Validators.required]),
      lastName: new FormControl(this.lastName, [Validators.required]),
      email: new FormControl(this.email, [Validators.required]),
      phone: new FormControl(this.phone, [Validators.required]),
      
    })
    this.dataLoading = false;
    this.user = new User();
  }

  ngOnInit(): void {
    this.userValidations.get('userName')?.valueChanges.subscribe(userName => this.userName = userName)
    this.userValidations.get('password')?.valueChanges.subscribe(password => this.password = password)
    this.userValidations.get('firstName')?.valueChanges.subscribe(firstName => this.firstName = firstName)
    this.userValidations.get('lastName')?.valueChanges.subscribe(lastName => this.lastName = lastName)
    this.userValidations.get('email')?.valueChanges.subscribe(email => this.email = email)
    this.userValidations.get('phone')?.valueChanges.subscribe(phone => this.phone = phone)
  }

  prepareUser(): void {
    this.user.userName = this.userName;
    this.user.password = this.password;
    this.user.createDate = new Date();
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.email = this.email;
    this.user.phone = this.phone;
    this.user.permissionId = 2;
    this.user.addressIds = [];
    this.user.imageBase64 = defaltImgBase64;
  }

  signup(): void {
    let isValid = this.userValidations.valid
    if (isValid) {
      this.dataLoading = true;
      this.prepareUser();
      let user: any;
      this.userService.signup(this.user).pipe(
        finalize(() => {
          this.dataLoading = false;
          if (user) {
            this.showToastSuccess();
            this.auth.login(user);
            this.bearerService.pass2Header(user);
            this.router.navigate(['/home'])
          } else {
            this.showToastError()
          }
        })
      ).subscribe(value => user = value)
    } else {
      this.userValidations.markAllAsTouched();
    }
    
  }
 

  showToastError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sai mật khẩu hoặc tên đăng nhập' });
  }

  showToastSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Sucess', detail: 'Sucess' });
  }

}
