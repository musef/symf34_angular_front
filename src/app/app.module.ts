import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../angularapp/components/header.component';
import { FooterComponent } from '../angularapp/components/footer.component';

import { AsignaturasListComponent } from '../angularapp/components/asignaturasList.component';
import { EstudiosListComponent } from '../angularapp/components/estudiosList.component';
import { ProfesoresListComponent } from '../angularapp/components/profesoresList.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AsignaturasListComponent,
    EstudiosListComponent,
    ProfesoresListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
