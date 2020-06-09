/* tslint:disable */
import { Catalogo } from './catalogo';
export interface Portaria {
  catalogos?: Array<Catalogo>;
  portariaAnexo?: string;
  portariaDataPublicacao?: string;
  portariaDataVencimento?: string;
  portariaFinalidade?: string;
  portariaId?: number;
  portariaNumero?: string;
  portariaObservacao?: string;
}
