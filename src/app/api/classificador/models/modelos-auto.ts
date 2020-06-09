import { AgrupamentoModeloAuto } from './agrupamento-modelo-auto';
import { ClassificacaoAuto } from './classificacao-auto';
export interface ModelosAuto {
  agrupamentoModeloAutos?: Array<AgrupamentoModeloAuto>;
  classificacaoAutos?: Array<ClassificacaoAuto>;
  modeloId?: number;
  modelosAutoFimVigencia?: string;
  modelosAutoId?: number;
  modelosAutoInicioVigencia?: string;
  modelosAutoUtilizacao?: number;
}
