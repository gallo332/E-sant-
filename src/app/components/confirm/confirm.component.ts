import { Component, OnInit , Inject} from '@angular/core';
import {MatDialogRef, MatDialog,  MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmComponent>) {
  
  }
  ngOnInit(){

  }

  closeDialog(){
  	this.dialogRef.close();
  }
  

}
