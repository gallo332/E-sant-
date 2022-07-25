import { Dossier }  from '../dossier/dossier';
export class Antecedent {
	id?:number;
	name?:string;
	data?:any;
	date?:Date;
	dossier?: Dossier;
}
