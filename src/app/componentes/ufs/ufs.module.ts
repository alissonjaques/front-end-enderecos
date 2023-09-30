import { MatDialogModule } from "@angular/material/dialog";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UfsRoutingModule } from "./ufs-routing.module";
import { CriarUfComponent } from "./criar-uf/criar-uf.component";
import { EditarUfComponent } from "./editar-uf/editar-uf.component";
import { ListarUfComponent } from "./listar-uf/listar-uf.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    UfsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  declarations: [CriarUfComponent, EditarUfComponent, ListarUfComponent],
})
export class UfsModule {}
