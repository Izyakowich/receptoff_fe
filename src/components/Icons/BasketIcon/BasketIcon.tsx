import * as React from 'react'
import { IconProps } from '../Icon';
import styles from './BasketIcon.module.scss'

const BasketIcon: React.FC<IconProps> = ({onClick}) => {
    return(
    <div className={styles.btn} onClick={onClick}>
    <svg version="1.1" id="Layer_1" style={{cursor: "pointer"}} fill="black" width="30px" height="30px" viewBox="0 0 512 512"
     xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" enable-background="new 0 0 512 512" xmlSpace="preserve">
    <g>
    </g>
    <g>
      <rect x="160" y="192" width="48" height="207"/>
      <rect x="232" y="192" width="48" height="207"/>
      <rect x="304" y="192" width="48" height="207"/>
      <path d="M374.845,112V80c0-20.872-14.845-48-46.845-48H184c-32,0-45.855,16-45.855,48v32H56v48h32v272c0,32,18.145,48,50.145,48
        H376c32,0,48-16,48-48V160h32v-48H374.845z M184,80h144v32H184V80z M376,432H138.145V160H376V432z"/>
    </g>
  </svg>
  </div>)
}

export default BasketIcon;

