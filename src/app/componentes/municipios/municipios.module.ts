import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MunicipiosRoutingModule } from "./municipios-routing.module";
import { CriarMunicipioComponent } from "./criar-municipio/criar-municipio.component";
import { EditarMunicipioComponent } from "./editar-municipio/editar-municipio.component";
import { ListarMunicipioComponent } from "./listar-municipio/listar-municipio.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    MunicipiosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  declarations: [
    CriarMunicipioComponent,
    EditarMunicipioComponent,
    ListarMunicipioComponent,
  ],
})
export class MunicipiosModule {}
