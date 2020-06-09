/* tslint:disable */
import { Coluna } from './coluna';
import { Produto } from './produto';
export interface ColunaProduto {
  coluna?: Coluna;
  colunaProdutoId?: number;
  colunaProdutoValor?: string;
  produto?: Produto;
  colunaProdutoNome?: string;
}
