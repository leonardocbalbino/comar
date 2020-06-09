/* tslint:disable */
import { Catalogo } from './catalogo';
import { ProdutoClassificacaoAuto } from './produto-classificacao-auto';
import { ColunaProduto } from './coluna-produto';
export interface Produto {
  produtoInicioVigencia?: string;
  catalogo?: Catalogo;
  produtoClassificacaoAutos?: Array<ProdutoClassificacaoAuto>;
  produtoFatorAceitacao?: number;
  produtoFimVigencia?: string;
  produtoId?: number;
  colunaProdutos?: Array<ColunaProduto>;
  produtoNome?: string;
  produtoTipoProduto?: string;
  produtoValorMaximo?: number;
  produtoValorMedio?: number;
  produtoValorMinimo?: number;
}
