import * as Dialog from '@radix-ui/react-dialog';

import { NewTransactionModal } from '../NewTransactionModal';

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

import logo from '../../assets/logo.svg';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} alt="logo" />

        <Dialog.Root>
          {/* to not create a new button, but use the one I'm passing to it */}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}