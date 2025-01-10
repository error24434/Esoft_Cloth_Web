import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// FormsModule
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('bar') bar!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;
  @ViewChild('close') close!: ElementRef;
  counter:number = 0;
  loginForm: FormGroup;
  isModalOpen: boolean = false;
  registerForm: FormGroup;
  isRegisterModalOpen: boolean = false;
  constructor(private router: Router, private dataService: DataService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.mustMatch('password', 'confirmPassword') }
    );
  }

  // counter items
  ngOnInit(): void {
    this.dataService.getProducts()
    .subscribe(res=>{
      // this.counter = res.length
      var count = 0;
      res.forEach((e:any) => {
        count += e.quantity
      });
      return this.counter = count
    })
  }
  // Menu toggle
  openMenu() {
    if (this.bar) {
        this.nav.nativeElement.classList.add("active");
    }
  }
  closeMenu(event: any) {
    if (this.close) {
        this.nav.nativeElement.classList.remove("active");
    }
    event.preventDefault();
  }
  // Nav Title
  MainMenus: any[] = [
    {
      href: '/home',
      title: 'Home',
      icon: 'fas fa-home',
    },
    {
      href: '/shop',
      title: 'Shop',
      icon: 'fas fa-shopping-cart',
    },
    {
      href: '/blog',
      title: 'Blog',
      icon: 'fas fa-blog',
    },
    {
      href: '/about',
      title: 'About',
      icon: 'fas fa-address-card',
    },
    {
      href: '/contact',
      title: 'Contact',
      icon: 'fas fa-address-book',
    },
    {
      href: '#',
      title: 'Login',
      icon: 'fas fa-user',
    },
    {
      href: '#',
      title: 'Register',
      icon: 'fas fa-user-plus',
    },
    {
      href: '/cart',
      cart: 'fas fa-shopping-bag',
      id: 'cart-bag',
    },
  ]

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
    } else {
      console.log('Form is invalid');
      this.loginForm.markAllAsTouched(); // Show errors for all fields
    }
  }

  openRegisterModal(): void {
    this.isRegisterModalOpen = true;
  }

  closeRegisterModal(): void {
    this.isRegisterModalOpen = false;
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Registration Successful', this.registerForm.value);
    } else {
      console.log('Form is invalid');
      this.registerForm.markAllAsTouched(); // Show errors for all fields
    }
  }
}
