import { Dossier }  from '../dossier/dossier';
import { Medecin }  from '../medecin/medecin';
export class Examen {
	id?:number;
	name?:string;
	data?:any;
	date?:Date;
	description?:string;
	structure:string;
	dossier?: Dossier;
	partageAvec:any;
}
