import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Erro } from "./Erro";

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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.erro.mensagem = decodeURIComponent(params["mensagem"]).replace(
        "<br>",
        " "
      );
      this.erro.status = params["status"];
      this.erro.url = decodeURIComponent(params["url"]);
    });
  }

  ok() {
    this.router.navigate([this.erro.url]);
  }
}
