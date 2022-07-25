import { Workday } from '../workday/workday';
export class Medecin {
	idM: number;
    prenom: string;
    nom: string;
    description: string;
    tel: string;
    identifiant: string;
    groupe: string;
    email: string;  
    color?:string;
    password: string;
    structure ?: string;
    token?:number;
    AvailableDays?: number[];
    startHour?: string;
    endHour?: string;
    WorkDays?: Workday[];
}
