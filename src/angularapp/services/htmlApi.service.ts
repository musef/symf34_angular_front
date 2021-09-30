import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";




@Injectable()
export class HtmlApiService {

	// produccion
	//public URL_BASE:string = "http://symf34.fmsdevelopment.com/api";
	// desarrollo
	public URL_BASE:string = "http://localhost/symf34_test/web/app_dev.php/api";
	public X_API_TOKEN:string = "blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla";


	public http: HttpClient;

	constructor(__http:HttpClient) {

		this.http = __http;
	}


	/**
	 * Gestiona la petición get para estudios, en función  de los
	 * parámetros recibidos:
	 *     - petition es la keyword para seleccionar la url
	 *     - searched es el parámetro para completar la url
	**/
	getEstudios(petition:string, searched:any): Observable<any> {

		let url ="";

		switch(petition) {
			case 'all':
				url = this.URL_BASE+"/estudios";
				break;
			case 'byid':
				url = this.URL_BASE+"/estudios/"+searched;
				break;
			case 'byname':
				url = this.URL_BASE+"/estudios/nombre/"+searched;
				break;				
			default:
				url = this.URL_BASE+"/estudios";
		}

		let headers = new HttpHeaders().set('x-api-key', this.X_API_TOKEN);
		headers.set('Access-Control-Allow-Credentials', 'true');

    	return this.http.get(url, {
		    headers: headers,
		    observe: 'response' as const,
		});

	}




	/**
	 * Gestiona la petición get para asignaturas, en función  de los
	 * parámetros recibidos:
	 *     - petition es la keyword para seleccionar la url
	 *     - searched es el parámetro para completar la url
	**/
	getAsignaturas(petition:string, searched:any): Observable<any> {

		let url ="";

		switch(petition) {
			case 'all':
				url = this.URL_BASE+"/asignaturas";
				break;
			case 'byid':
				url = this.URL_BASE+"/asignaturas/"+searched;
				break;
			case 'byname':
				url = this.URL_BASE+"/asignaturas/nombre/"+searched;
				break;
			case 'byid_profs':
				url = this.URL_BASE+"/asignaturas/"+searched+"/profesores";
				break;
			default:
				url = this.URL_BASE+"/asignaturas";
		}


		let headers = new HttpHeaders().set('x-api-key', this.X_API_TOKEN);
		headers.set('Access-Control-Allow-Credentials', 'true');

    	return this.http.get(url, {
		    headers: headers,
		    observe: 'response' as const,
		});
	}


	/**
	 * Gestiona la petición get para profesores, en función  de los
	 * parámetros recibidos:
	 *     - petition es la keyword para seleccionar la url
	 *     - searched es el parámetro para completar la url
	**/
	getProfesores(petition:string, searched:any): Observable<any> {

		let url ="";

		switch(petition) {
			case 'all':
				url = this.URL_BASE+"/profesores";
				break;
			case 'byid':
				url = this.URL_BASE+"/profesores/"+searched;
				break;
			case 'byname':
				url = this.URL_BASE+"/profesores/nombre/"+searched;
				break;
			case 'byid_asign':
				url = this.URL_BASE+"/profesores/"+searched+"/asignaturas";
				break;			
			default:
				url = this.URL_BASE+"/profesores";
		}

		let headers = new HttpHeaders().set('x-api-key', this.X_API_TOKEN);
		headers.set('Access-Control-Allow-Credentials', 'true');

    	return this.http.get(url, {
		    headers: headers,
		    observe: 'response' as const,
		});

	}	


}