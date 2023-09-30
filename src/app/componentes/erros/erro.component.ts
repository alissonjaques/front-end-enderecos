import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Erro } from "./Erro";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-erro",
  templateUrl: "./erro.component.html",
  styleUrls: ["./erro.component.css"],
})
export class ErroComponent implements OnInit {
  erro: Erro = {
    mensagem: "",
    status: 400,
    url: "",
  };

  constructor(
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (this.data && this.data.mensagem) {
      this.erro.mensagem = decodeURIComponent(this.data.mensagem);
    }
    if (this.data && this.data.status) {
      this.erro.status = this.data.status;
    }
  }

  ngOnInit(): void {}
}
