import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MatChipsModule } from "@angular/material/chips";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RodapeComponent } from "./componentes/rodape/rodape.component";
import { CabecalhoComponent } from "./componentes/cabecalho/cabecalho.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, CabecalhoComponent, RodapeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
