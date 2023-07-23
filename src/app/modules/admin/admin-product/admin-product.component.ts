import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../model/Product';
import { CategoryService } from 'src/app/services/category.service';
import { finalize } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { BrandService } from 'src/app/services/brand.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./../css/main.scss']
})
export class AdminProductComponent implements OnInit {

  productForm: FormGroup;
  categories: any[]
  brands: any[]
  products: any[];
  orderShowed: Product[]
  dataLoading: boolean;

  product: Product;

  productSubmit: Product;

  selectedCategory: any;
  selectedBrand: any;

  shortLink: string = "";
  loading: boolean = false; 
  file!: File;
  fileBase64!: any;
  isEdit: boolean = false;

  constructor(private messageService: MessageService, private fileUploadService: FileUploadService, private brandService: BrandService, private categoryService: CategoryService, private productService: ProductService) { 
    this.product = new Product();
    this.productSubmit = new Product();
    this.categories = []
    this.brands = []
    this.products = []
    this.orderShowed = []
    this.dataLoading = false;
    

    this.productForm = new FormGroup({
      productName: new FormControl(this.product.productName, [Validators.required]),
      description: new FormControl(this.product.productDescription, [Validators.required]),
      specification: new FormControl(this.product.specification, [Validators.required]),
      calculationUnit: new FormControl(this.product.calculationUnit, [Validators.required]),
      imageBase64: new FormControl(this.product.imageBase64, [Validators.required]),
      discount: new FormControl(this.product.discount, [Validators.required]),
      sold: new FormControl(this.product.sold, [Validators.required]),
      quantity: new FormControl(this.product.quantity, [Validators.required]),
      price: new FormControl(this.product.price, [Validators.required]),
      categoryId: new FormControl(this.product.categoryId, [Validators.required]),
      brandId: new FormControl(this.product.brandId, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllBrands();
    this.getAllProduct();
    this.productForm.get('productName')?.valueChanges.subscribe(productName => this.product.productName = productName)
    this.productForm.get('description')?.valueChanges.subscribe(productDescription => this.product.productDescription = productDescription)
    this.productForm.get('specification')?.valueChanges.subscribe(specification => this.product.specification = specification)
    this.productForm.get('calculationUnit')?.valueChanges.subscribe(calculationUnit => this.product.calculationUnit = calculationUnit)
    this.productForm.get('imageBase64')?.valueChanges.subscribe(imageBase64 => this.product.imageBase64 = imageBase64)
    this.productForm.get('discount')?.valueChanges.subscribe(discount => this.product.discount = discount)
    this.productForm.get('sold')?.valueChanges.subscribe(sold => this.product.sold = sold)
    this.productForm.get('quantity')?.valueChanges.subscribe(quantity => this.product.quantity = quantity)
    this.productForm.get('price')?.valueChanges.subscribe(price => this.product.price = price)
    this.productForm.get('categoryId')?.valueChanges.subscribe(categoryId => this.product.categoryId = categoryId.id)
    this.productForm.get('brandId')?.valueChanges.subscribe(brandId => this.product.brandId = brandId.id)
  }


  getAllCategory(): void {
    this.categoryService.getAllCategory().pipe(
      finalize(() => console.log(this.categories))
    ).subscribe(data => this.categories = data)
  }

  onChange(event: any) {
    const _this = this;
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = function () {
      _this.fileBase64 = reader.result;
      _this.product.imageBase64 = _this.fileBase64;
      _this.productSubmit.imageBase64 = _this.fileBase64;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    console.log(this.product)
  }

  getAllBrands(): void {
    this.dataLoading = true;
    this.brandService.getAllBrand().pipe(
      finalize(() => {
        this.dataLoading = false
      })
    )
    .subscribe(data => this.brands = data)
  }

  addProduct(): void {
    this.dataLoading = true;
    let data;
    if (!this.isEdit) {
      data = this.product;
    } else {
      data = this.productSubmit
    }
    this.productService.saveProduct(data).pipe(
      finalize(() => {
        this.dataLoading = false;
        this.showToastSuccess();
        this.getAllProduct();
        this.product.imageBase64 = '';
      })
    )
    .subscribe(data => console.log(data))
  }

  prepareProduct2Edit(product: Product): void {
    this.productForm.get('productName')?.setValue(product.productName)
    this.productForm.get('description')?.setValue(product.productDescription)
    this.productForm.get('specification')?.setValue(product.specification)
    this.productForm.get('calculationUnit')?.setValue(product.calculationUnit)
    this.productForm.get('imageBase64')?.setValue(product.imageBase64)
    this.productForm.get('discount')?.setValue(product.discount)
    this.productForm.get('sold')?.setValue(product.sold)
    this.productForm.get('quantity')?.setValue(product.quantity)
    this.productForm.get('price')?.setValue(product.price)
    this.selectedCategory = this.getCategoryById(product.categoryId)
    this.productForm.get('categoryId')?.setValue(this.selectedCategory)
    this.selectedBrand = this.getBrandById(product.brandId)
    this.productForm.get('brandId')?.setValue(this.selectedBrand)

    this.productSubmit = Object.assign({}, this.product);
    this.productSubmit.id = product.id;

    console.log('product',this.product)
    console.log('productSubmit',this.productSubmit)

  }

  editProduct(product: Product): void {
    this.isEdit = true;
    this.prepareProduct2Edit(product);
    console.log(this.productSubmit)
  }

  getAllProduct(): void {
    this.dataLoading = true;
    this.productService.getAllProduct().pipe(
      finalize(() => {
        this.dataLoading = false
        console.log('product', this.products)
      })
     
    )
    .subscribe(data => this.products = data)
  }

  getCategoryById(id: number): any {
    let category = this.categories.find(item => item.id === id)
    return category;
  }

  getBrandById(id: number): any {
    let brand = this.brands.find(item => item.id === id)
    return brand;
  }

  deleteProduct(product: any) {
    this.dataLoading = true;
    this.productService.deleteProduct(product.id).pipe(
      finalize(() => {
        this.getAllProduct();
      })
    ).subscribe(data => console.log(data))
  }

  showToastSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Sucess', detail: 'Sucess' });
  }

}
