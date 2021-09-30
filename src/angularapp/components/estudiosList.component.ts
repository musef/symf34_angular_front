import {Component, OnInit} from "@angular/core";


import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/operators';

import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import { Location } from '@angular/common';


import {ExplanationComponent} from "./explanation.component";
import {HtmlApiService} from "../services/htmlApi.service";


@Component({
	selector: "estudios",
	templateUrl: "../views/__nfo_estudios_template.html",
	providers: [HtmlApiService]
})

export class EstudiosListComponent implements OnInit{

	// cabecera en texto
	public queryObjectSelected:string;

	// valores para request
	public idEstudio:number;
	public nameSearched:string;

	// valores recuperados respuesta
	public status:number;
	public dataEstudio:any;
	public resultMessage:string;

	// parametro data es array
	public isEstudioArray:boolean;


	constructor(private __routeParams:ActivatedRoute, private __htmlService:HtmlApiService, private __location: Location) {
		
		this.queryObjectSelected = "Peticiones de datos por estudios";
		this.dataEstudio = "";
		this.status = 0;
		this.resultMessage = "";
		this.isEstudioArray = true;

		this.idEstudio = 0;
		this.nameSearched = "";		
	}


	ngOnInit():any {


		const routeName = this.__routeParams.snapshot.paramMap.get('word');
		const routeId:any = this.__routeParams.snapshot.paramMap.get('id');
		const routeIdAsign:any = this.__routeParams.snapshot.paramMap.get('idasign');

		if (routeName !== null && routeName.length > 0 ){

			this.getEstudios("byname",routeName);
			this.isEstudioArray = true;

		} else if (routeId !== null) {
 
			const id = Number.parseInt(routeId);

			if (!isNaN(id)) {
				console.log('ID:'+id);
				this.getEstudios("byid",id);
				this.isEstudioArray = false;

			}

		} else {

			let pathActual = this.__location.path();
			if (pathActual.search('show') < 0) {
				this.getEstudios("all","");
				this.isEstudioArray = true;				
			}
		}

	}



	onClickAll() {
		this.getEstudios("all","");
		this.isEstudioArray = true;	
	}


	onClickById() {
		this.getEstudios("byid",this.idEstudio);
		this.isEstudioArray = false;
	}

	onClickByNombre() {
		this.getEstudios("byname",this.nameSearched);
		this.isEstudioArray = true;
	}



	/**
	 * Esta función realiza la petición segun parametros recibidos
	 * y gestiona la response obteniendo:
	 *    - status
	 *    - data
	 *    - mensaje
	**/
	getEstudios(petition:string, searched:any) {

		let response = this.__htmlService.getEstudios(petition,searched);

		response.subscribe(

			result =>{

				//console.log(result.status);
				//console.log(result);
				//console.log(result.body);

				this.status = result.status;
				this.dataEstudio = result.body.data;
				this.resultMessage = result.body.message;

			}, 

			error => {

				this.status = error.status;

				this.resultMessage = error.error.message;
				this.dataEstudio = "";

				console.log(error.status);
				console.log(error.error.data);
				console.log(error.error.message);
			}

		);

	}

}