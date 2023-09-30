import { MatDialog } from "@angular/material/dialog";
import { ErroComponent } from "../componentes/erros/erro.component";

export function openErrorDialog(
  dialog: MatDialog,
  mensagem: string,
  status: string
) {
  dialog.open(ErroComponent, {
    width: "50%",
    hasBackdrop: true,
    data: {
      mensagem: mensagem,
      status: status,
    },
  });
}
