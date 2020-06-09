/* tslint:disable */
import { Catalogo } from './catalogo';
import { HierarquiaColuna } from './hierarquia-coluna';
import { Produto } from './produto';
export interface Hierarquia {
  catalogos?: Array<Catalogo>;
  hierarquiaColunas?: Array<HierarquiaColuna>;
  hierarquiaId?: number;
  hierarquiaNome?: string;
  hierarquiaOrdem?: number;
  hierarquiaPai?: Hierarquia;
  hierarquias?: Array<Hierarquia>;
  produto?: Produto;
}
