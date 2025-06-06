import { useContextSelector } from 'use-context-selector';

import { TransactionsContext } from '../../contexts/TransactionsContext';

import { SearchForm } from '../../components/SearchForm';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { Summary } from '../../components/Summary';
import { Header } from '../../components/Header';

import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles';

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  });

  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}