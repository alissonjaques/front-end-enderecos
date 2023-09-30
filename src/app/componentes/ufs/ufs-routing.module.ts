import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarUfComponent } from "./listar-uf/listar-uf.component";
import { CriarUfComponent } from "./criar-uf/criar-uf.component";
import { EditarUfComponent } from "./editar-uf/editar-uf.component";

const routes: Routes = [
  {
    path: "ufs",
    component: ListarUfComponent,
  },
  {
    path: "ufs/criarUf",
    component: CriarUfComponent,
  },
  {
    path: "ufs/editarUf/:codigoUF",
    component: EditarUfComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UfsRoutingModule {}
