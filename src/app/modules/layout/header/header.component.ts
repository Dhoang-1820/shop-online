import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerRef!: any;
  @ViewChild('header_parent') input!: ElementRef<HTMLInputElement>;

  constructor() {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
   console.log(this.input)
    window.addEventListener('scroll', this.slideHeader)
  }

  slideHeader = () => {
    const scrolled = window.screenTop || window.scrollY
   this.input.nativeElement.style.transition = 'all 1s'
    if (scrolled >= 600) {
        this.input.nativeElement.style.height = 50 + 'px'
    } else {
        this.input.nativeElement.style.height = 80 + 'px'
    }
  }

  addEven(): void {
    window.addEventListener('scroll', this.slideHeader)

  }


}
