import React from 'react'
import { IconProps } from '../Icon';
import styles from './AcceptIcon.module.scss'

const AcceptIcon: React.FC<IconProps> = ({onClick}) => {
  return (
    <div className={styles.btn} onClick={onClick}>
        <svg width={30} height={30} fill='#000' id="Layer_1" enable-background="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <style type="text/css">{'.st0{fill:#231F20;}'}</style>
    <g>
      <path className="st0" d="M235.1,386.3c-5.7,0-11.1-2.4-14.9-6.6l-104.1-116c-7.4-8.2-6.7-20.9,1.5-28.2c8.2-7.4,20.9-6.7,28.2,1.5 l86.8,96.8l131.6-199.1c6.1-9.2,18.5-11.7,27.7-5.7c9.2,6.1,11.7,18.5,5.7,27.7L251.8,377.4c-3.4,5.2-9,8.5-15.2,8.9 C236.1,386.3,235.6,386.3,235.1,386.3z" />
    </g>
  </svg>
    </div>
  )
}

export default AcceptIcon