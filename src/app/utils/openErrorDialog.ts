import { MatDialog } from "@angular/material/dialog";
import { ErroComponent } from "../componentes/erro/erro.component";

export function openErrorDialog(
  dialog: MatDialog,
  mensagem: string,
  status: string
) {
  const dialogRef = dialog.open(ErroComponent, {
    width: "50%",
    hasBackdrop: true,
    data: {
      mensagem: mensagem,
      status: status,
    },
  });
}
