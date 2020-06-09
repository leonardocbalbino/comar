import { Atributo } from '../../model/atributo';
import { ConfigAgente } from '../models/config-agente';

export interface ConfigAgenteResponse {
  atributoModeloId: number,
  atributo: Atributo,
  atributoModeloExpressao: string,
  atributoModeloReversao: string,
  atributoModeloTexto: string,
  atributoModeloTipo: string,
  modelo: {
    modeloId: number,
    modeloNome: string,
    modeloPercentTreino: number,
    modeloPublicado: string,
    modeloSchemaConfig: string,
    modeloTabelaConfig: string,
    modeloPercentGrupo: number,
    modeloAcuraciaMedia: number
  },
  configAgente: ConfigAgente
}
