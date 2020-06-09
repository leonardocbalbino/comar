/* tslint:disable */
import { RegraProdutoDTO } from './regra-produto-dto';
export interface RegraManualDTO {
  regraManualAplicacao?: number;
  regraManualDataCadastro?: string;
  regraManualFimVigencia?: string;
  regraManualId?: number;
  regraManualInicioVigencia?: string;
  regraManualJustificativa?: string;
  regraManualNome?: string;
  regraProdutos?: Array<RegraProdutoDTO>;
}
