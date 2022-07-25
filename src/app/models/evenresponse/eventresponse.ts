import { Medecin } from '../medecin/medecin';
import { RendezVous }  from '../rendezVous/rendez-vous';
export class EventResponse {
	id?:number;
	idP?: number;
	idMed?:number;
	start: Date;
	end: Date;
	starttime?:string;
	endtime ?: string;
	structure?: string;
	color ?: string;
	lieu ?: string;
	title?: string;
	supprime?: boolean;
	notifier?: boolean;
	medecin ?: Medecin;
	rendezVous:	RendezVous;
	code?: number;
	message?: string;

}
