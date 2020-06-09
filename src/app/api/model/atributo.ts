/**
 * S.M.A.R.T Minerador
 * Documentação da Api do WS do S.M.A.R.T Minerador
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AtributoGrupo } from './atributoGrupo';
import { Fonte } from './fonte';
import { Modelo } from './modelo';
import { ParametroModelo } from './parametroModelo';
import { Pasta } from './pasta';
import { Regra } from './regra';


export interface Atributo { 
    atributoAlias?: string;
    atributoGrupos?: Array<AtributoGrupo>;
    atributoId?: number;
    atributoNome?: string;
    atributoTipo?: string;
    fonte?: Fonte;
    modelos1?: Array<Modelo>;
    modelos2?: Array<Modelo>;
    parametroModelos?: Array<ParametroModelo>;
    pasta?: Pasta;
    regras?: Array<Regra>;
}
