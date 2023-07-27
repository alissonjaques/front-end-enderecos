import { Component, OnInit } from '@angular/core';
import { Uf } from '../Uf';
import { UfService } from '../uf.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listar-uf',
  templateUrl: './listar-uf.component.html',
  styleUrls: ['./listar-uf.component.css']
})
export class ListarUfComponent implements OnInit {

  listaUfs: Uf[] = [];

  uf: Uf = {
    codigoUF: 0,
    sigla: '',
    nome: '',
    status: 1
  }

  constructor(
    private service: UfService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.service.listar().subscribe((listaUfs) => {
      this.listaUfs = listaUfs
    })
  }

  editarUf() {
    this.service.editar(this.uf).subscribe(() => {
      this.router.navigate(['/ufs'])
    })

  }

  cancelar() {
    this.router.navigate(['/menu'])
  }

}
