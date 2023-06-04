import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AuthenService } from 'src/app/services/authen.service';
import { BearerService } from 'src/app/services/bearer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  userValidations: FormGroup;

  userName!: string;
  password!: string;
  dataLoading: boolean;

  constructor(private bearerService: BearerService, private auth: AuthenService, private router: Router, private userService: UserService, private messageService: MessageService) { 
    this.userValidations = new FormGroup({
      userName: new FormControl(this.userName, [Validators.required]),
      password: new FormControl(this.password, [Validators.required])
    })
    this.dataLoading = false;
  }

  ngOnInit(): void {
    this.userValidations.get('userName')?.valueChanges.subscribe(userName => this.userName = userName)
    this.userValidations.get('password')?.valueChanges.subscribe(password => this.password = password)
  }

  login(): void {
    let isInValid = this.userValidations.get('userName')?.invalid && this.userValidations.get('userName')?.invalid
    if (!isInValid) {
      this.dataLoading = true;
      let user: any;
      this.userService.login(this.userName, this.password).pipe(
        finalize(() => {
          this.dataLoading = false;
          if (user) {
            this.showToastSuccess();
            this.auth.login(user);
            this.bearerService.pass2Header(user);
            this.router.navigate(['/home'])
          } else {
            this.showToastError(); 
          }
        })
      ).subscribe(value => user = value)
    } else {
      this.userValidations.get('userName')?.markAllAsTouched()
      this.userValidations.get('password')?.markAllAsTouched()
    }
    
  }
  

  showToastError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sai mật khẩu hoặc tên đăng nhập' });
  }

  showToastSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Sucess', detail: 'Sucess' });
  }

}
