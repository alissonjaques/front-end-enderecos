import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarMunicipioComponent } from "./listar-municipio/listar-municipio.component";
import { CriarMunicipioComponent } from "./criar-municipio/criar-municipio.component";
import { EditarMunicipioComponent } from "./editar-municipio/editar-municipio.component";

const routes: Routes = [
  {
    path: "municipios",
    component: ListarMunicipioComponent,
  },
  {
    path: "municipios/criarMunicipio",
    component: CriarMunicipioComponent,
  },
  {
    path: "municipios/editarMunicipio/:codigoMunicipio",
    component: EditarMunicipioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MunicipiosRoutingModule {}
