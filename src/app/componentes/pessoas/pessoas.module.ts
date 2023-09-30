import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PessoasRoutingModule } from "./pessoas-routing.module";
import { CriarPessoaComponent } from "./criar-pessoa/criar-pessoa.component";
import { EditarPessoaComponent } from "./editar-pessoa/editar-pessoa.component";
import { ListarPessoaComponent } from "./listar-pessoa/listar-pessoa.component";
import { ModalEnderecoComponent } from "./modal-endereco/modal-endereco.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    PessoasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  declarations: [
    CriarPessoaComponent,
    EditarPessoaComponent,
    ListarPessoaComponent,
    ModalEnderecoComponent,
  ],
})
export class PessoasModule {}
