import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { RendezvousResponse } from  'src/app/models/rendezvousResponse/rendezvous-response';
import { MedecinService }  from 'src/app/services/medecin/medecin.service'; 
@Component({
  selector: 'list-rendez-vous',
  templateUrl: './list-rendez-vous.component.html',
  styleUrls: ['./list-rendez-vous.component.scss']
})
export class ListRendezVousComponent implements OnInit {
  displayedColumns = ['date', 'patient', 'motif', 'centre', 'actions'];
  dataSource: MatTableDataSource<RendezvousResponse>;
  rendezVous:RendezvousResponse[];
  busy:any;
  message:string;
  tester:boolean=false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _medService: MedecinService) { 
  	this.busy=this._medService.getMedecinAllRv().subscribe(data =>{
		    //console.log("reponse all patient event ",data)
		    if(data!==null && data.length!==0){
		      this.rendezVous=data;
		      this.dataSource = new MatTableDataSource(this.rendezVous);
		      this.dataSource.paginator = this.paginator;
    		  this.dataSource.sort = this.sort;
		    }else{
		      this.message="Aucun rendez-vous à afficher!!!";
		      this.tester=true;
		    }
		  },
	  error =>{
	    this.busy=null;
	    alert("Le serveur ne répond pas!!!");
	    
	  }
	  )
  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
