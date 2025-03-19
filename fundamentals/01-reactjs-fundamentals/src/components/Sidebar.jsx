import { PencilLine } from 'phosphor-react';

import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img 
        className={styles.cover}
        src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=60&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      />

      <div className={styles.profile}>
        <img src="https://github.com/viniciussmelo.png" className={styles.avatar}/>

        <strong>Vinicius Melo</strong>
        <span>Full Stack developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={15} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}