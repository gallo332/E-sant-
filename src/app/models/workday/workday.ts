import { Medecin } from '../medecin/medecin';
export class Workday {
	id: number;
	numIndex: number;
	active: boolean;
	workStartHour: Date;
	workEndHour :Date;
	breakStartHour: Date;
	breakEndHour: Date;
	state: string;
    jour: string;
	medecin: Medecin;
}
