import { Component } from '@angular/core';

@Component({
	selector: "footer-comp",
	templateUrl: "../views/__footer_template.html"
})



export class FooterComponent{

	public copyrightText:string;

	constructor() {

		let yearcopyright = new Date().getFullYear();

		this.copyrightText = "copyright fmsdevelopment "+yearcopyright;
	}

}