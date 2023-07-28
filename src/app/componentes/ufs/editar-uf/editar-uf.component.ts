import { Component, OnInit } from '@angular/core';
import { Uf } from '../Uf';
import { UfService } from '../uf.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-uf',
  templateUrl: './editar-uf.component.html',
  styleUrls: ['./editar-uf.component.css']
})
export class EditarUfComponent implements OnInit {

   uf: Uf = {
    codigoUF: 0,
    sigla: '',
    nome: '',
    status: 0
  }

  constructor(
    private service: UfService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const codigoUF = this.route.snapshot.paramMap.get('codigoUF')
    this.service.buscarPorCodigoUF(parseInt(codigoUF!)).subscribe((uf) => {
      this.uf = uf
    })
  }

  editarUf() {
    this.uf.status = Number(this.uf.status);
    this.service.editar(this.uf).subscribe(() => {
      this.router.navigate(['/ufs'])
    })
  }

  cancelar() {
    this.router.navigate(['/ufs'])
  }
}
