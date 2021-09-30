import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExplanationComponent } from '../angularapp/components/explanation.component';
import { AsignaturasListComponent } from '../angularapp/components/asignaturasList.component';
import { EstudiosListComponent } from '../angularapp/components/estudiosList.component';
import { ProfesoresListComponent } from '../angularapp/components/profesoresList.component';

const routes: Routes = [

  {path:"", component:ExplanationComponent },

  {path:"asignaturas/show", component: AsignaturasListComponent},
  {path:"asignaturas",  component: AsignaturasListComponent},
  {path:"asignaturas/:id",  component: AsignaturasListComponent},
  {path:"asignaturas/nombre/:word", component: AsignaturasListComponent},
  {path:"asignaturas/:idasign/profesores", component: AsignaturasListComponent},


  {path:"estudios/show", component: EstudiosListComponent},
  {path:"estudios", component: EstudiosListComponent},
  {path:"estudios/:id", component: EstudiosListComponent},
  {path:"estudios/nombre/:word", component: EstudiosListComponent},

  {path:"profesores/show", component: ProfesoresListComponent },
  {path:"profesores", component: ProfesoresListComponent },
  {path:"profesores/:id", component: ProfesoresListComponent },
  {path:"profesores/nombre/:word", component: ProfesoresListComponent },
  {path:"profesores/:idprof/asignaturas", component: ProfesoresListComponent },

  {path:"**", component: ExplanationComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
