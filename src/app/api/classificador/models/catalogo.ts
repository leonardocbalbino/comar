/* tslint:disable */
import { Hierarquia } from './hierarquia';
import { Portaria } from './portaria';
import { Produto } from './produto';
export interface Catalogo {
  catalogoArquivo?: string;
  catalogoFimVigencia?: string;
  catalogoId?: number;
  catalogoInicioVigencia?: string;
  hierarquia?: Hierarquia;
  portaria?: Portaria;
  produtos?: Array<Produto>;
}
