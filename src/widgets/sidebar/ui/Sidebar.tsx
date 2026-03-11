import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

const navItems = [
  { label: 'Главная', path: '/' },
  { label: 'Изменение этапности', path: '/change-stages' },
  { label: 'Отчёты', path: '/reports' },
  { label: 'Настройки', path: '/settings' },
]

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Система</div>
      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `${styles.link}${isActive ? ` ${styles.linkActive}` : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
