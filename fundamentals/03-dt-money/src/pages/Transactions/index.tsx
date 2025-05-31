import { SearchForm } from '../../components/SearchForm';
import { Summary } from '../../components/Summary';
import { Header } from '../../components/Header';

import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles';

export function Transactions() {
  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">R$ 12.000,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>13/04/2025</td>
            </tr>
            <tr>
              <td width="50%">Hamburguer</td>
              <td>
                <PriceHighlight variant="outcome">- R$ 59,00</PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>13/04/2025</td>
            </tr>
            <tr>
              <td width="50%">Aluguel do apartamento</td>
              <td>- R$ 1.200,00</td>
              <td>Casa</td>
              <td>13/04/2025</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}