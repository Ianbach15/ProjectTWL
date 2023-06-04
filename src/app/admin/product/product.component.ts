import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { ApiService } from 'src/app/services/api.service';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  book:any={};
  penggunas:any=[];
  constructor(
    public dialog:MatDialog,
    public api:ApiService
  ) {

  }

  ngOnInit(): void {
    this.title='Pengguna';
    //memperbarui variabel book
    this.book={
      title:'Angular untuk Newbie',
      author:'Ian Bachtiar',
      publisher:'Sunhouse Digital',
      year:2020,
      isbn:'8298377474',
      price:70000
    };
    this.getPengguna();
  }
  loading:boolean | any;
  getPengguna()
  {
    this.loading=true;
    this.api.get('users').subscribe(result=>{
      this.penggunas=result;
      this.loading=false;
    },error=>{
      this.loading=false;
  })
  }  

  
productDetail(data: any,idx: number)
{
  let dialog=this.dialog.open(ProductDetailComponent, {
    width:'400px',
    data:data
  });
  dialog.afterClosed().subscribe(res=>{
    if(res)
    {
       //jika idx=-1 (penambahan data baru) maka tambahkan data
      if(idx==-1)this.penggunas.push(res);      
       //jika tidak maka perbarui data  
      else this.penggunas[idx]=data; 
    }
  })
}

loadingDelete:any={};
deletePengguna(id: any,idx: any)
{
   var conf=confirm('Delete pengguna?');
   if(conf)
   {
    this.loadingDelete[idx]=true;
     this.api.delete('users/'+id).subscribe(result=>{
       this.penggunas.splice(idx,1);
       this.loadingDelete[idx]=false;
     },error=>{
      this.loadingDelete[idx]=false;
      alert('Tidak dapat menghapus data');
     });
    }

}

uploadFile(data: any)
{
 let dialog=this.dialog.open(FileUploaderComponent, {
   width:'400px',
   data:data
 });
 dialog.afterClosed().subscribe(res=>{
   return;
 })
}

downloadFile(data: any)
{
  FileSaver.saveAs('http://api.sunhouse.co.id/penggunastore/')
}



}
