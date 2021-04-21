import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:any = {};
  constructor(
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  loading:boolean;
  hide:boolean = true;

  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = nre FormControl('', [Validators.requires]);

  login(user) {
    this.loading = true;
    this.api.login(user.email, user.password).subscribe(res => {
      console.log(res);
      this.loading = false;
      localStorage.setItem('appToken', JSON.stringify(res));
      this.router.navigate(['admin/dashboard']);
    }, err => {
      this.loading = false;
      alert('Tidak dapat login');
    })
  }

}
