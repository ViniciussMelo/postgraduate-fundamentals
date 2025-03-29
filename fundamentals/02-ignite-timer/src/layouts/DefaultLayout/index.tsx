import { Outlet } from 'react-router-dom';

import { LayoutContainer } from './styles';

import { Header } from '../../components/Header';

export function DefaultLayout() {
  return (
    <LayoutContainer>
      {/* o que vai ficar fixo */}
      <Header />
      {/* espaço para ser inserido um conteúdo */}
      <Outlet />
    </LayoutContainer>
  )
}