import { Algoritmo } from './algoritmo';
import { Atributo } from './atributo';
import { FuncaoMineracao } from './funcaoMineracao';
import { FuncaoMineracaoAlgoritmo } from './funcaoMineracaoAlgoritmo';
import { Grupo } from './grupo';
import { Historico } from './historico';
import { ParametroModelo } from './parametroModelo';
import { Usuario } from './usuario';


export interface Modelo { 
    algoritmo?: Algoritmo;
    atributo1?: Atributo;
    atributo2?: Atributo;
    funcaoMineracaoAlgoritmo?: FuncaoMineracaoAlgoritmo;
    funcaoMineracao?: FuncaoMineracao;
    grupo?: Grupo;
    historicos?: Array<Historico>;
    modeloId?: number;
    modeloNome?: string;
    modeloPercentTreino?: number;
    modeloPercentGrupo?: number;
    modeloPublicado?: number;
    modeloSchemaConfig?: string;
    modeloTabelaConfig?: string;
    parametroModelos?: Array<ParametroModelo>;
    usuario?: Usuario;
    modeloDataCriacao?:Date;
    modeloAcuraciaMedia?:number;    
}
