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

  adicionarUf() {
    this.router.navigate(['/ufs/editarUf'])
  }

  editarUf(codigoUF: number | undefined) {
    if(codigoUF){
      this.router.navigate([`/ufs/${codigoUF}`])
    }
  }

  cancelar() {
    this.router.navigate(['/menu'])
  }

}
