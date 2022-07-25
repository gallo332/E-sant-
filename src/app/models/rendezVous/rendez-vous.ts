import { Medecin } from '../medecin/medecin';
import { Patient } from '../patient/patient';
import { AntecedentMedecin } from '../antecedentMedecin/antecedent-medecin';
import { ExamenMedecin }  from '../examenmedecin/examenmedecin';

export class RendezVous {
	id: number;
	start: Date;
	end : Date;
	title: string;
	status: boolean;
	medecin : Medecin;
	patient :Patient;
	notifier: boolean;
	examenRdv?:ExamenMedecin[];
	antecedentRdv?:AntecedentMedecin[];
}
