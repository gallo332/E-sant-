import { Examen }  from '../examen/examen';
import { RendezVous } from '../rendezVous/rendez-vous';
import { Medecin } from '../medecin/medecin';
export class ExamenMedecin {
	id?:any;
	examen?:Examen;
	medecin?:Medecin;
	rendezVous?: RendezVous;
}
