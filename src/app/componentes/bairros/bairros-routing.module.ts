import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarBairroComponent } from "./listar-bairro/listar-bairro.component";
import { CriarBairroComponent } from "./criar-bairro/criar-bairro.component";
import { EditarBairroComponent } from "./editar-bairro/editar-bairro.component";

const routes: Routes = [
  {
    path: "bairros",
    component: ListarBairroComponent,
  },
  {
    path: "bairros/criarBairro",
    component: CriarBairroComponent,
  },
  {
    path: "bairros/editarBairro/:codigoBairro",
    component: EditarBairroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BairrosRoutingModule {}
