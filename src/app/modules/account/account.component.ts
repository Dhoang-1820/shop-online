import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MenuItem, MessageService } from 'primeng/api'
import { finalize } from 'rxjs'
import { AddressService } from 'src/app/services/address.service'
import { AuthenService } from 'src/app/services/authen.service'
import { BearerService } from 'src/app/services/bearer.service'
import { CartService } from 'src/app/services/cart.service'
import { OrderService } from 'src/app/services/order.service'
import { ProductService } from 'src/app/services/product.service'
import { UserService } from 'src/app/services/user.service'

interface Product {
    date?: any
    id?: number
    orderDetailList?: []
    paymentMode?: string
    status?: string
    totalPrice?: number
    userId?: number
}

interface Filter {
    id?: number,
    display?: string;
}

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    providers: [MessageService]
})
export class AccountComponent implements OnInit {
    items!: MenuItem[]
    provices: any[]
    districts: any[]
    wards: any[]
    provinceSelected: any
    districtSelected: any
    wardSelected: any
    home!: MenuItem
    orders: any[]

    orderShowed: Product[]
    userInfo: any
    checkoutInfoForm: FormGroup;

    passwordForm: FormGroup;

    filter: Filter[];

    firstName: string
    lastName: string
    userProvince: string
    userDistrict: string
    userWard: string
    userAddressDetail: string
    userEmail: string
    userPhone: string

    isAccountScreen: boolean
    isOrderScreen: boolean
    isChangePasswordScreen: boolean

    dataLoading: boolean;

    selectedFilter: number;

    oldPass: string;
    newPass: string;
    confirmPass: string;

    addressUserGeneral: string;


    constructor(private messageService: MessageService, private router: Router, private addressService: AddressService, private orderService: OrderService, private userService: UserService, private auth: AuthenService, private bearerService: BearerService, private productService: ProductService, ) {
        this.orderShowed = []
        this.provices = []
        this.districts = []
        this.wards = []
        this.orders = []
        this.firstName = ''
        this.lastName = ''
        this.userEmail = ''
        this.userPhone = ''
        this.userProvince = ''
        this.userDistrict = ''
        this.userWard = ''
        this.userAddressDetail = ''
        this.oldPass = ''
        this.newPass = ''
        this.confirmPass = ''
        this.addressUserGeneral = ''
        this.dataLoading = false

        this.isAccountScreen = true
        this.isOrderScreen = false
        this.isChangePasswordScreen = false

        this.checkoutInfoForm = new FormGroup({
            firstName: new FormControl(this.firstName, [Validators.required]),
            lastName: new FormControl(this.lastName, [Validators.required]),
            provices: new FormControl(this.userProvince, [Validators.required]),
            districts: new FormControl(this.userDistrict, [Validators.required]),
            wards: new FormControl(this.userWard, [Validators.required]),
            addressDetail: new FormControl(this.userAddressDetail, [Validators.required]),
            email: new FormControl(this.userEmail, [Validators.email]),
            phone: new FormControl(this.userPhone, [Validators.required]),
        })

        this.passwordForm = new FormGroup({
            oldPass: new FormControl(this.oldPass, [Validators.required]),
            newPass: new FormControl(this.newPass, [Validators.required]),
            confirmPass: new FormControl(this.confirmPass, [Validators.required])
        })

        this.selectedFilter = 1;

        this.filter = [
            {
                id: 1,
                display: 'Đang xử lý'
            },
            {
                id: 2,
                display: 'Đang giao'
            },
            {
                id: 3,
                display: 'Đã giao'
            },
            {
                id: 4,
                display: 'Đã huỷ'
            },
        ]
       
    }

    ngOnInit(): void {
        this.userInfo = this.auth.getUserLoggedIn();
        this.items = [{ label: 'Danh mục' }, { label: 'Tài khoản' }]
        this.home = { icon: 'pi pi-home' }
        this.checkoutInfoForm.get('firstName')?.valueChanges.subscribe(firstName => this.firstName = firstName)
        this.checkoutInfoForm.get('lastName')?.valueChanges.subscribe(lastName => this.lastName = lastName)
        this.checkoutInfoForm.get('email')?.valueChanges.subscribe(userEmail => this.userEmail = userEmail)
        this.checkoutInfoForm.get('phone')?.valueChanges.subscribe(userPhone => this.userPhone = userPhone)
        this.checkoutInfoForm.get('addressDetail')?.valueChanges.subscribe(userAddressDetail => this.userAddressDetail = userAddressDetail)
        this.getAllProvices();
        this.checkoutInfoForm.get('provices')?.valueChanges.subscribe(provices => {
            this.userProvince = provices.name;
            this.provinceSelected = provices;
            this.getDistrictsOfProvice();
        })
        this.checkoutInfoForm.get('districts')?.valueChanges.subscribe(districts => {
            this.userDistrict = districts.name;
            this.districtSelected = districts;
            this.getWardsOfDistrict();
        })
        this.checkoutInfoForm.get('wards')?.valueChanges.subscribe(userWard => {
            this.userWard = userWard;
            this.wardSelected = userWard
        })

        this.passwordForm.get('oldPass')?.valueChanges.subscribe(oldPass => {
            this.oldPass = oldPass;
            if (this.oldPass !== this.userInfo.password) {
                this.passwordForm.get('oldPass')?.setErrors({'wrong': true});
            }
        })
        this.passwordForm.get('newPass')?.valueChanges.subscribe(newPass => this.newPass = newPass)
        this.passwordForm.get('confirmPass')?.valueChanges.subscribe(confirmPass => this.confirmPass = confirmPass)

        this.userInfo = this.auth.getUserLoggedIn();

        this.checkoutInfoForm.get('firstName')?.setValue(this.userInfo.firstName);
        this.checkoutInfoForm.get('lastName')?.setValue(this.userInfo.lastName);
        this.checkoutInfoForm.get('email')?.setValue(this.userInfo.email);
        this.checkoutInfoForm.get('phone')?.setValue(this.userInfo.phone);
        

        if (this.router.url.includes('order')) {
            this.getOrder()
        }
        this.getUserAddressById()
    }

    getUserAddressById(): void {
        this.userService.getUserAddressById(this.userInfo.addressIds[0]).pipe(
            finalize(() => {
                console.log(this.addressUserGeneral)
                this.checkoutInfoForm.get('addressDetail')?.setValue(this.addressUserGeneral);
            })
        ).subscribe(data => this.addressUserGeneral = data.addressGeneral)
    }


    getAllProvices(): void {
        this.addressService.getProvices().pipe(
          finalize(() => console.log(this.provices))
        ).subscribe(data => this.provices = data)
      }
    
      getDistrictsOfProvice(): void {
        this.wards = [];
        this.addressService.getDistrictsOfProvince(this.provinceSelected.code).pipe(
          finalize(() => console.log('districts',this.districts))
        ).subscribe(data => this.districts = data.districts)
      }
    
      getWardsOfDistrict(): void {
        this.addressService.getWardsOfDistrict(this.districtSelected.code).pipe(
          finalize(() => console.log('wards', this.wards))
        ).subscribe(data => this.wards = data.wards)
      }
    

    getAccount(): void {
        this.isAccountScreen = true
        this.isOrderScreen = false
        this.isChangePasswordScreen = false
    }

    getOrder(): void {
        this.isAccountScreen = false
        this.isOrderScreen = true
        this.isChangePasswordScreen = false
        this.getAllOrderByUserId();
       
    }

    changePassword(): void {
        this.isAccountScreen = false
        this.isOrderScreen = false
        this.isChangePasswordScreen = true
    }

    getAllOrderByUserId(): void {
        this.dataLoading = true
        this.orderService.getOrderByUserId(this.userInfo.id).pipe(
            finalize(() => {
                this.dataLoading = false;
                this.orderShowed = this.orders;
                this.orderShowed.forEach(item => item.date = new Date(item.date));
                this.changeFilter({id: 1, display: 'Đang xử lý'});
            }),
        )
        .subscribe((order) => (this.orders = order))
    }

    changeFilter(target: any): void {
        console.log(target)
        this.selectedFilter = target.id;
        this.orderShowed = this.orders.filter(item => item.status === target.display);
        this.orderShowed.forEach(item => item.date = new Date(item.date));
    }

    changeUserPassword(): void {
        let isValid = this.passwordForm.valid
        if (isValid) {
            this.dataLoading = true;
            this.userInfo.password = this.newPass;
            this.userService.editUser(this.userInfo).pipe(
                finalize(() => {
                    this.dataLoading = false
                    this.showToastSuccess()
                    this.auth.logout()
                    this.auth.login(this.userInfo)
                })
            ).subscribe(data => this.userInfo)
        } else {
            this.passwordForm.markAllAsTouched();
        }
        
    }

    updateUser(): void {
        let isValid = this.checkoutInfoForm.valid
        if (isValid) {
            this.userInfo.firstName = this.firstName;
            this.userInfo.lastName = this.lastName;
            this.userInfo.email = this.userEmail;
            this.userInfo.phone = this.userPhone;
            this.userService.editUser(this.userInfo).pipe(
                finalize(() => {
                    this.auth.logout();
                        this.auth.login(this.userInfo)
                        this.bearerService.pass2Header({});
                    this.showToastSuccess()
                })
            ).subscribe(data => this.userInfo = data)

        } else {
            this.checkoutInfoForm.markAllAsTouched();
        }
    }

    showToastSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Sucess', detail: 'Sửa tài khoản thành công' });
    }

    logOut(): void {
        this.auth.logout();
        this.bearerService.pass2Header({});
        this.router.navigate(['/home'])
    }
}
