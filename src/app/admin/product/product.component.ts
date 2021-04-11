import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title : any;
  books : any = [];
  constructor(
    public dialog:MatDialog,
    public api:ApiService
  )
  {
    this.title = 'Produk';
    this.getBooks();
  }

  ngOnInit(): void {
  }

  loading:boolean;

  getBooks() {
    this.loading = true;
    this.api.get('books').subscribe(result => {
      this.books = result;
      this.loading = false;
    }, error => {
      alert('Ada masalah saat pengambilan data. Coba lagi!');
      this.loading = false;
    });
    /**
    this.books = [
      {
        title: 'Angular untuk Pemula',
        author: 'Farid Suryanto',
        publisher: 'Sunhouse Digital',
        year: 2020,
        isbn: '8298377474',
        price: 70000
      },
      {
        title: 'Membuat Aplikasi Maps menggunakan Angular',
        author: 'Farid Suryanto',
        publisher: 'Sunhouse Digital',
        year: 2020,
        isbn: '82983323455',
        price: 75000
      }
    ];
    */
  }

  productDetail(data, idx)
  {
    let dialog = this.dialog.open(ProductDetailComponent, {
      width: '400px',
      data: data
    });
    dialog.afterClosed().subscribe(res => {
      if(res)
      {
        // jika idx = -1 maka tambahkan data baru
        if(idx == -1)
          this.books.push(res);
        // jika tidak maka perbarui data sesuai index
        else
          this.books[idx] = res;
      }
    });
  }

  loadingDelete:any = {};

  deleteProduct(id,idx)
  {
    let conf = confirm('Delete item?');
    if(conf)
    {
      this.loadingDelete[idx] = true;
      this.api.delete('books/' + id).subscribe(result => {
        this.books.splice(idx,1);
        this.loadingDelete[idx] = false;
      }, error => {
        alert('Gagal menghapus data!');
        this.loadingDelete[idx] = false;
      });
    }
  }

}
