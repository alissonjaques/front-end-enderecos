import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ErroComponent } from "./erro.component";
import { ErrosRoutingModule } from "./erros-routing.module";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [CommonModule, ErrosRoutingModule, MatDialogModule],
  declarations: [ErroComponent],
})
export class ErrosModule {}
