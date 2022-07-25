import { AntecedentMedecin } from '../antecedentMedecin/antecedent-medecin';
import { ExamenMedecin }  from '../examenmedecin/examenmedecin';
export class RendezvousResponse {
	id?: number;
	idE?: number;
	idP ?:number;
	idM ?: number;
	start?: string;
	end ?: string;
	tel ?: string;
	title ?: string;
	typenotif ?: string;
	nom ?: string;
	prenom ?: string;
	email ?: string;
	nomD ?: string;
	prenomD ?: string;
    groupe ?: string;
    notifier ?:boolean;
    structure?:string;
    code?: number;
	message?: string;
    examenRdv?:ExamenMedecin[];
	antecedentRdv?:AntecedentMedecin[]

}
