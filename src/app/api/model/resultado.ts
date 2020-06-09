import { Grupo } from './grupo';

export interface Coluna {
    nome?: string;
    tipo?: string;
}

export interface Estatisticas {
    estatisticas?: Resultado;
    grupo?: Grupo;
}

export interface Resultado {
    colunas?: Coluna[];
    linhas?: [];
}

export interface Acuracia {
    val?: number;
    acuraciaMedia?: number;
}


export interface ComparaModelo {
    modelos?: string;
}
