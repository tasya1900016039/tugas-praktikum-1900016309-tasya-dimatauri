import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    this.api.get('bookswithauth/status').subscribe(res => {
      // is logged in
      return;
    }, err => {
      // not logged in
      this.router.navigate(['/login']);
    });
  }

  logout() {
    const conf = confirm('Keluar aplikasi?');
    if(conf) {
      localStorage.removeItem('appToken');
      window.location.reload();
    }
  }

  menu=[
    {
      name:'Dashboard',
      icon:'dashboard',
      url:'/admin/dashboard'
    },
    {
      name:'Product',
      icon:'camera-enhance',
      url:'/admin/product'
    },
    {
      group:'Menu Group',
      children:[
        {
          name:'Image Gallery',
          icon:'images',
          url:'/admin/gallery'
        }
      ]
    }
  ];

}
