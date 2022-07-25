import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }


  openConfirmDialog(msg){
  	return this.dialog.open(ConfirmComponent,{
  		width:'390px',
  		disableClose:true,
  		data:{
  			message:msg
  		}
  	});
  }
}
