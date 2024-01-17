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
        <span className={styles['breadcrumbs__item-icon']}>/</span>}
      </span>
    ))}
  </div>
  )
}

export default  BreadCrumbs


// const BreadCrumbs = () => {
//   const location = useLocation()

//   let currentLink = ""

//   const crumbs = location.pathname
//     .split("/")
//     .filter((crumb) => crumb !== "")
//     .map((crumb) => {
//       currentLink += `/${crumb}`

//       if (crumb == "history") crumb = "История"
//       if (crumb == "planesDevelopment_frontend") crumb = "Услуги"
//       if (crumb == "cart") crumb = "Корзина"
//       if (crumb == "auth") crumb = "Авторизация"
//       if (crumb == "registration") crumb = "Регистрация"
//       if (crumb == "application") crumb = "Заказ"
//       if (crumb == "options-list") crumb = "Список опций"

//       return (
//         <div className={styles.crumb} key={crumb}>
//           <Link to={currentLink}>{crumb}</Link>
//         </div>
//       )
//     })

//   return (
//     <div className={styles.breadcrumbs}>
//       <div className={styles.crumb}>
//         <Link to={"/"}>Главная</Link>
//       </div>
//       {crumbs}
//     </div>
//   )
// }

// export default BreadCrumbs