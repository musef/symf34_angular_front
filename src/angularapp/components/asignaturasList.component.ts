import {Component, OnInit} from "@angular/core";

import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import { Location } from '@angular/common';


import {ExplanationComponent} from "./explanation.component";
import {HtmlApiService} from "../services/htmlApi.service";


@Component({
	selector: "asignaturas",
	templateUrl: "../views/__nfo_asignaturas_template.html",
	providers: [HtmlApiService]
})

export class AsignaturasListComponent implements OnInit{

	// cabecera en texto
	public queryObjectSelected:string;


	// valores para request
	public idAsignatura:number;
	public nameSearched:string;
	public idAsignaturaProf:number;

	// valores recuperados respuesta
	public status:number;
	public dataAsignatura:any;
	public resultMessage:string;

	// parametro data es array
	public isAsignaturaArray:boolean;


	constructor(private __routeParams:ActivatedRoute, private __htmlService:HtmlApiService, private __location: Location) {
		
		this.queryObjectSelected = "Peticiones de datos por asignaturas";
		this.dataAsignatura="";
		this.status=0;
		this.resultMessage="";
		this.isAsignaturaArray = true;

		this.idAsignatura = 0;
		this.idAsignaturaProf = 0;
		this.nameSearched = "";

	}


	ngOnInit():any {
	

		const routeName = this.__routeParams.snapshot.paramMap.get('word');
		const routeId:any = this.__routeParams.snapshot.paramMap.get('id');
		const routeIdAsign:any = this.__routeParams.snapshot.paramMap.get('idasign');

		if (routeName !== null && routeName.length > 0 ){

			this.getAsignaturas("byname",routeName);
			this.isAsignaturaArray = true;

		} else if (routeId !== null) {
 
			const id = Number.parseInt(routeId);

			if (!isNaN(id)) {
				console.log('ID:'+id);
				this.getAsignaturas("byid",id);
				this.isAsignaturaArray = false;

			}

		} else if (routeIdAsign !== null) {

			let idAsign = Number.parseInt(routeIdAsign);

			if (!isNaN(idAsign)) {

				this.getAsignaturas("byid_profs",idAsign);
				this.isAsignaturaArray = true;	

			}

		} else {

			let pathActual = this.__location.path();
			if (pathActual.search('show') < 0) {
				this.getAsignaturas("all","");
				this.isAsignaturaArray = true;				
			}
		}

	}



	onClickAll() {
		this.getAsignaturas("all","");
		this.isAsignaturaArray = true;	
	}


	onClickById() {
		this.getAsignaturas("byid",this.idAsignatura);
		this.isAsignaturaArray = false;
	}

	onClickByNombre() {
		this.getAsignaturas("byname",this.nameSearched);
		this.isAsignaturaArray = true;
	}

	onClickAsignProf() {
		this.getAsignaturas("byid_profs",this.idAsignaturaProf);
		this.isAsignaturaArray = true;
	}
			


	/**
	 * Esta función realiza la petición segun parametros recibidos
	 * y gestiona la response obteniendo:
	 *    - status
	 *    - data
	 *    - mensaje
	**/
	getAsignaturas(petition:string, searched:any) {

		let response = this.__htmlService.getAsignaturas(petition,searched);

		response.subscribe(

			result =>{

				this.status = result.status;
				this.dataAsignatura = result.body.data;
				this.resultMessage = result.body.message;

			}, 

			error => {

				this.status = error.status;

				this.resultMessage = error.error.message;
				this.dataAsignatura = "";

				console.log(error.status);
				console.log(error.error.data);
				console.log(error.error.message);
			}

		);

	}

}