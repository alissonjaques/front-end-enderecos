import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarPessoaComponent } from "./listar-pessoa/listar-pessoa.component";
import { CriarPessoaComponent } from "./criar-pessoa/criar-pessoa.component";
import { EditarPessoaComponent } from "./editar-pessoa/editar-pessoa.component";

const routes: Routes = [
  {
    path: "pessoas",
    component: ListarPessoaComponent,
  },
  {
    path: "pessoas/criarPessoa",
    component: CriarPessoaComponent,
  },
  {
    path: "pessoas/editarPessoa/:login",
    component: EditarPessoaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoasRoutingModule {}
