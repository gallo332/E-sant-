import { Dossier } from '../dossier/dossier';
export class Patient {
	idP: number;
    prenom: string;
    nom: string;
    adresse: string;
    tel: string;
    email: string;  
    password: string;
    numDossier?:string;
    dossier?: Dossier;
    token?:string;
}
