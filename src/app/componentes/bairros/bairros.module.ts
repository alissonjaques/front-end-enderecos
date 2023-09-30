import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListarBairroComponent } from "./listar-bairro/listar-bairro.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CriarBairroComponent } from "./criar-bairro/criar-bairro.component";
import { EditarBairroComponent } from "./editar-bairro/editar-bairro.component";
import { BairrosRoutingModule } from "./bairros-routing.module";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    BairrosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  declarations: [
    CriarBairroComponent,
    EditarBairroComponent,
    ListarBairroComponent,
  ],
})
export class BairrosModule {}
