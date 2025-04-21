import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './BreadCrumbs.module.scss'
import { useLinksMapData } from 'Slices/DetailedSlice'
import { useProduct } from 'Slices/DetailedSlice'

const BreadCrumbs = () => {
  const location = useLocation()
  const linksMap = useLinksMapData()
  const product = useProduct()

  let currentLink = ""

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`

      // Проверяем, является ли текущий crumb числом (ID продукта)
      if (!isNaN(Number(crumb))) {
        // Если у нас есть продукт и его ID совпадает с текущим crumb
        if (product && product.title && product.id === Number(crumb)) {
          return (
            <div className={styles.crumb} key={crumb}>
              <Link to={currentLink}>{product.title}</Link>
            </div>
          )
        }
        // Если есть название в linksMap
        if (linksMap.has(crumb)) {
          return (
            <div className={styles.crumb} key={crumb}>
              <Link to={currentLink}>{linksMap.get(crumb)}</Link>
            </div>
          )
        }
      }

      // Обработка стандартных маршрутов
      let displayText = crumb
      switch (crumb) {
        case "history":
          displayText = "История"
          break
        case "planesDevelopment_frontend":
          displayText = "Услуги"
          break
        case "cart":
          displayText = "Корзина"
          break
        case "auth":
          displayText = "Авторизация"
          break
        case "registration":
          displayText = "Регистрация"
          break
        case "application":
          displayText = "Заказ"
          break
        case "options-list":
          displayText = "Список опций"
          break
        case "products":
          displayText = "Блюда"
          break
        case "admin":
          displayText = "Управление блюдами"
          break
        case "add":
          displayText = "Добавление блюда"
          break
        case "edit":
          displayText = "Редактирование блюда"
          break
        case "detailed":
          displayText = "Подробнее"
          break
        case "applications":
          displayText = "Список заявок"
          break
      }

      return (
        <div className={styles.crumb} key={crumb}>
          <Link to={currentLink}>{displayText}</Link>
        </div>
      )
    })

  return (
    <div className={styles.breadcrumbs}>
      {crumbs}
    </div>
  )
}

export default BreadCrumbs 