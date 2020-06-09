import { Component, OnInit } from '@angular/core';
import { SchemaService } from '@app/api/service/schema.service';
import { Observable, combineLatest } from 'rxjs';
import { DbaSchema } from '@app/api/model/models';
import { map } from 'rxjs/operators';
import { VisibilidadeService } from '@app/api/service/visibilidade.service';
import Visibilidade from '@app/api/model/visibilidade';
import swal from 'sweetalert2';

@Component({
  selector: 'app-visibilidade-form',
  templateUrl: './visibilidade-form.component.html',
  styleUrls: ['./visibilidade-form.component.css']
})
export class VisibilidadeFormComponent implements OnInit {

  schemas: Array<DbaSchema>;
  visiveis: Array<DbaSchema>;

  constructor(private schemaService: SchemaService, private visibilidadeService: VisibilidadeService) { }

  ngOnInit() {
    combineLatest(this.schemaService.listarTodos(), this.schemaService.listar())
      .pipe(
        map(([schemas, visiveis]) => ({schemas, visiveis}))
      ).subscribe((pair) => {
        // tslint:disable-next-line: prefer-const
        let { schemas , visiveis} = pair;

        visiveis.forEach((value) => {
          schemas = schemas.filter(schema => schema.schemaName !== value.schemaName);
        });

        this.schemas = schemas;
        this.visiveis = visiveis;
      });
  }

  salvar() {
    if (this.visiveis) {
      const visibilidades: Visibilidade[] = [];
      this.visiveis.forEach((value) => {
        const visibilidade: Visibilidade = {
          visibilidadeSchema: value.schemaName
        };
        visibilidades.push(visibilidade);
      });

      console.log(visibilidades);

      this.visibilidadeService.salvar(visibilidades).subscribe((res) => {
        swal.fire('Informação', 'Salvo com sucesso', 'success');
      });
    }
    // this.visibilidadeService.salvar();
  }
}
