import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user:any = {};
  constructor(
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  //email = new FormControl('', [Validators.required, Validators.email]);
  //password = new FormControl('', [Validators.minLength(6), Validators.required]);

  loading:boolean;
  hide:boolean = true;

  register(user) {
    this.loading = true;
    this.api.register(user.email, user.password).subscribe(res => {
      console.log(res);
      this.loading = false;
      alert('Registrasi Berhasil');
      // this.router.navigate(['auth/login']);
    }, err => {
      this.loading = false;
      alert('Ada masalah...');
    });
  }

}
