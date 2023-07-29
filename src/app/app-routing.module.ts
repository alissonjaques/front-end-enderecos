import { CriarPensamentoComponent } from "./componentes/pensamentos/criar-pensamento/criar-pensamento.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarPensamentoComponent } from "./componentes/pensamentos/listar-pensamento/listar-pensamento.component";
import { ExcluirPensamentoComponent } from "./componentes/pensamentos/excluir-pensamento/excluir-pensamento.component";
import { EditarPensamentoComponent } from "./componentes/pensamentos/editar-pensamento/editar-pensamento.component";
import { MenuComponent } from "./componentes/menu/menu.component";
import { ListarUfComponent } from "./componentes/ufs/listar-uf/listar-uf.component";
import { EditarUfComponent } from "./componentes/ufs/editar-uf/editar-uf.component";
import { ErroComponent } from "./componentes/erro/erro.component";
import { CriarUfComponent } from "./componentes/ufs/criar-uf/criar-uf.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "menu",
    pathMatch: "full",
  },
  {
    path: "menu",
    component: MenuComponent,
  },
  {
    path: "ufs",
    component: ListarUfComponent,
  },
  {
    path: "ufs/editarUf/:codigoUF",
    component: EditarUfComponent,
  },
  {
    path: "ufs/criarUf",
    component: CriarUfComponent,
  },
  {
    path: "criarPensamento",
    component: CriarPensamentoComponent,
  },
  {
    path: "listarPensamento",
    component: ListarPensamentoComponent,
  },
  {
    path: "pensamentos/excluirPensamento/:id",
    component: ExcluirPensamentoComponent,
  },
  {
    path: "pensamentos/editarPensamento/:id",
    component: EditarPensamentoComponent,
  },
  {
    path: "erro",
    component: ErroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
