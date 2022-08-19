import { FaGithub, FaBuilding, FaUserFriends, FaExternalLinkAlt } from 'react-icons/fa'
import type { User } from '../../pages'

import styles from './styles.module.scss'

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className={styles.container}>
      <img src={user.avatar} alt={`Avatar de ${user.name}`} className={styles.avatar} />

      <div className={styles.content}>
        <header>
          <h2>{user.name}</h2>

          <a href={user.url} target="_blank" rel="noopener noreferrer">
            GitHub
            <FaExternalLinkAlt size="12px" />
          </a>
        </header>

        <p>{user.bio}</p>

        <div className={styles.iconsContainer}>
          <span className={styles.iconContainer}>
            <FaGithub size="18px" />
            {user.login}
          </span>
          {Boolean(user.company) && (
            <span className={styles.iconContainer}>
              <FaBuilding size="18px" />
              {user.company}
            </span>
          )}
          <span className={styles.iconContainer}>
            <FaUserFriends size="18px" />
            {user.followers} seguidores
          </span>
        </div>
      </div>
    </div>
  )
}
