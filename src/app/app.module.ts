import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MatChipsModule } from "@angular/material/chips";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RodapeComponent } from "./componentes/rodape/rodape.component";
import { CabecalhoComponent } from "./componentes/cabecalho/cabecalho.component";
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
import { ListarPessoaComponent } from "./componentes/pessoas/listar-pessoa/listar-pessoa.component";
import { CriarPessoaComponent } from "./componentes/pessoas/criar-pessoa/criar-pessoa.component";
import { EditarPessoaComponent } from "./componentes/pessoas/editar-pessoa/editar-pessoa.component";
import { ModalEnderecoComponent } from "./componentes/pessoas/modal-endereco/modal-endereco.component";

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    MenuComponent,
    ListarUfComponent,
    EditarUfComponent,
    ErroComponent,
    CriarUfComponent,
    ListarMunicipioComponent,
    CriarMunicipioComponent,
    EditarMunicipioComponent,
    ListarBairroComponent,
    CriarBairroComponent,
    EditarBairroComponent,
    ListarPessoaComponent,
    CriarPessoaComponent,
    EditarPessoaComponent,
    ModalEnderecoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
