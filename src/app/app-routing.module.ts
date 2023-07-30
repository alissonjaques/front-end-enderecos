import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./componentes/menu/menu.component";
import { ListarUfComponent } from "./componentes/ufs/listar-uf/listar-uf.component";
import { EditarUfComponent } from "./componentes/ufs/editar-uf/editar-uf.component";
import { ErroComponent } from "./componentes/erro/erro.component";
import { CriarUfComponent } from "./componentes/ufs/criar-uf/criar-uf.component";
import { ListarMunicipioComponent } from "./componentes/municipios/listar-municipio/listar-municipio.component";
import { CriarMunicipioComponent } from "./componentes/municipios/criar-municipio/criar-municipio.component";
import { EditarMunicipioComponent } from "./componentes/municipios/editar-municipio/editar-municipio.component";
import { ListarBairroComponent } from "./componentes/bairros/listar-bairro/listar-bairro.component";
import { CriarBairroComponent } from "./componentes/bairros/criar-bairro/criar-bairro.component";
import { EditarBairroComponent } from "./componentes/bairros/editar-bairro/editar-bairro.component";

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
    path: "ufs/criarUf",
    component: CriarUfComponent,
  },
  {
    path: "ufs/editarUf/:codigoUF",
    component: EditarUfComponent,
  },
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
