/* tslint:disable */
import { AlvoConfigAgente } from './alvo-config-agente';
import { Atributo } from './atributo';
import { ClassificacaoAuto } from './classificacao-auto';
export interface ConfigAgente {
  alvoConfigAgentes?: Array<AlvoConfigAgente>;
  atributo?: Atributo;
  atributoModeloId?: number;
  classificacaoAutos?: Array<ClassificacaoAuto>;
  configAgenteId?: number;
}
