import {Component, OnInit} from "@angular/core";

import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import { Location } from '@angular/common';


import {ExplanationComponent} from "./explanation.component";
import {HtmlApiService} from "../services/htmlApi.service";


@Component({
	selector: "profesores",
	templateUrl: "../views/__nfo_profesores_template.html",
	providers: [HtmlApiService]
})

export class ProfesoresListComponent implements OnInit{

	// cabecera en texto
	public queryObjectSelected:string;

	// valores para request
	public idProfesor:number;
	public nameSearched:string;
	public idProfesorAsign:number;

	// valores recuperados respuesta
	public status:number;
	public dataProfesores:any;
	public resultMessage:string;

	// parametro data es array
	public isProfesorArray:boolean;
	public init:boolean;

	constructor(private __routeParams:ActivatedRoute, private __htmlService:HtmlApiService, private __location: Location) {
		
		this.queryObjectSelected = "Peticiones de datos por profesores";
		this.dataProfesores = "";
		this.status = 0;
		this.resultMessage = "";
		this.isProfesorArray = false;

		this.idProfesor = 0;
		this.idProfesorAsign = 0;
		this.nameSearched = "";

		this.init = true;
	}


	ngOnInit():any {

		const routeName = this.__routeParams.snapshot.paramMap.get('word');
		const routeId:any = this.__routeParams.snapshot.paramMap.get('id');
		const routeIdProf:any = this.__routeParams.snapshot.paramMap.get('idprof');


		if (routeName !== null && routeName.length > 0 ){

			this.getProfesores("byname",routeName);
			this.isProfesorArray = true;

		} else if (routeId !== null) {
 
			const id = Number.parseInt(routeId);

			if (!isNaN(id)) {
				this.getProfesores("byid",id);
				this.isProfesorArray = false;	

			}

		} else if (routeIdProf !== null) {

			const idProf = Number.parseInt(routeIdProf);

			if (!isNaN(idProf)) {

				this.getProfesores("byid_asign",idProf);
				this.isProfesorArray = true;

			}

		} else {

			let pathActual = this.__location.path();
			if (pathActual.search('show') < 0) {
				this.getProfesores("all","");
				this.isProfesorArray = true;				
			}
		}

	}


	onClickAll() {
		this.getProfesores("all","");
		this.isProfesorArray = true;	
	}


	onClickById() {
		this.getProfesores("byid",this.idProfesor);
		this.isProfesorArray = false;
	}

	onClickByNombre() {
		this.getProfesores("byname",this.nameSearched);
		this.isProfesorArray = true;
	}

	onClickProfAsign() {
		this.getProfesores("byid_asign",this.idProfesorAsign);
		this.isProfesorArray = true;
	}


	/**
	 * Esta función realiza la petición segun parametros recibidos
	 * y gestiona la response obteniendo:
	 *    - status
	 *    - data
	 *    - mensaje
	**/
	getProfesores(petition:string, searched:any) {

		let response = this.__htmlService.getProfesores(petition,searched);

		response.subscribe(

			result =>{

				this.status = result.status;
				this.dataProfesores = result.body.data;
				this.resultMessage = result.body.message;

			}, 

			error => {

				this.status = error.status;

				this.resultMessage = error.error.message;
				this.dataProfesores = "";

				console.log(error.status);
				console.log(error.error.data);
				console.log(error.error.message);
			}

		);

	}

}