import React from 'react'
import { Link } from 'react-router-dom'
import styles from './BreadCrumbs.module.scss'
import ArrowIcon from 'components/Icons/ArrowIcon'

export type BreadCrumbsProps = {
  links: Map<string, string>;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({links}) => {
  return (
    <div className={styles.breadcrumbs}>
    {Array.from(links.entries()).map(([key, value], index) => (
      <span
          key={key}
          className={`${styles.breadcrumbs__item} ${index === links.size - 1 ? styles['breadcrumbs__item-last'] : ''}`}
        >
        <Link className={`${styles['breadcrumbs__item-link']} ${index === links.size - 1 ? styles['breadcrumbs__item-last'] : ''}`} to={value}>
          {key}
        </Link>
        {index !== links.size - 1 && 
        <span className={styles['breadcrumbs__item-icon']}><ArrowIcon /></span>}
      </span>
    ))}
  </div>
  )
}

export default  BreadCrumbs