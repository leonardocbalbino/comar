import { RegraProdutoDTO } from './regra-produto-dto';

export interface RegraManualResponse {
  regraManualAplicacao?: number;
  regraManualDataCadastro?: string;
  regraManualFimVigencia?: string;
  regraManualId?: number;
  regraManualInicioVigencia?: string;
  regraManualJustificativa?: string;
  regraManualNome?: string;
  regraProdutos?: Array<RegraProdutoDTO>;
}
