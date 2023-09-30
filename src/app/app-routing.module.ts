import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./componentes/menu/menu.module").then((m) => m.MenuModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./componentes/ufs/ufs.module").then((m) => m.UfsModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./componentes/municipios/municipios.module").then(
        (m) => m.MunicipiosModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./componentes/bairros/bairros.module").then(
        (m) => m.BairrosModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./componentes/pessoas/pessoas.module").then(
        (m) => m.PessoasModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./componentes/erros/erros.module").then((m) => m.ErrosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
