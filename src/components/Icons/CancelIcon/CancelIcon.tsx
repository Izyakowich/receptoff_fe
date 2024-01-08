import React from 'react'
import { IconProps } from '../Icon';
import styles from './CancelIcon.module.scss'

const CancelIcon: React.FC<IconProps> = ({onClick}) => {
  return (
    <div className={styles.btn} onClick={onClick}>
      <svg width={30} height={30} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs></defs><title/><g data-name="Layer 2" id="Layer_2"><path d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z"/><path d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z"/></g><g id="frame"><rect style={{fill: 'none'}} className="cls-1" height="32" width="32"/></g></svg>
    </div>
  )
}

export default CancelIcon