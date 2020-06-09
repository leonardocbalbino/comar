/* tslint:disable */
import { ClassificacaoAuto } from './classificacao-auto';
import { NotaIten } from './nota-iten';
import { Produto } from './produto';
import { Usuario } from '@app/api/model/models';
export interface ItemClassificacaoManual {
  classificacaoAuto?: ClassificacaoAuto;
  itemClassificacaoManualData?: Date;
  itemClassificacaoManualId?: number;
  notaIten?: NotaIten;
  produto?: Produto;
  usuario?: Usuario;
}
