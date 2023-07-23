import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../model/Category';
import { CategoryService } from 'src/app/services/category.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./../css/main.scss']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;

  categories: Category[];

  category: Category;

  categorySubmit: Category;
  dataLoading: boolean = false;
  file!: File;
  fileBase64!: any;
  isEdit: boolean = false;

  constructor(private categoryService: CategoryService) {
    this.category = new Category()
    this.category.imageBase64 = null;
    this.categorySubmit = new Category()
    this.categories = []

    this.categoryForm = new FormGroup({
      name: new FormControl(this.category.name, [Validators.required]),
      note: new FormControl(this.category.note),
    })
  }

  ngOnInit(): void {
    this.categoryForm.get('name')?.valueChanges.subscribe(name => this.category.name = name)
    this.categoryForm.get('note')?.valueChanges.subscribe(note => this.category.note = note)
    this.getAllCategory()
  }

  getAllCategory(): void {
    this.dataLoading = true;
    this.categoryService.getAllCategory().pipe(
      finalize(() => {
        console.log(this.categories)
        this.dataLoading = false;
      })
    ).subscribe(data => this.categories = data)
  }

  addCategory(): void {
    this.dataLoading = true;
    if (!this.isEdit) {
      this.categoryService.saveCategory(this.category).pipe(
        finalize(() => {
          this.getAllCategory();
          this.category.imageBase64 = '';
        })
      )
      .subscribe(data => console.log(data))
    } else {
      this.categoryService.editCategory(this.categorySubmit).pipe(
        finalize(() => {
          this.getAllCategory();
          this.isEdit = false;
        })
      )
      .subscribe(data => console.log(data))
    }
    
  }

  prepareProduct2Edit(category: Category): void {
    this.categoryForm.get('name')?.setValue(category.name)
    this.categoryForm.get('note')?.setValue(category.note)

    this.categorySubmit = Object.assign({}, this.category)
    this.categorySubmit.id = category.id;

    console.log('category',this.category)
    console.log('categorySubmit',this.categorySubmit)
  }

  editCategory(category: any): void {
    this.isEdit = true;
    this.prepareProduct2Edit(category);
  }

  deleteCategory(category: any): void {
    this.dataLoading = true;
    this.categoryService.deleteCategory(category.id).pipe(
      finalize(() => {
        this.getAllCategory();
      })
    ).subscribe(data => console.log(data))
  }

  onChange(event: any) {
    const _this = this;
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = function () {
      _this.fileBase64 = reader.result;
      _this.category.imageBase64 = _this.fileBase64;
      _this.categorySubmit.imageBase64 = _this.fileBase64;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    console.log(this.category)
    console.log(this.categorySubmit)
  }

}
