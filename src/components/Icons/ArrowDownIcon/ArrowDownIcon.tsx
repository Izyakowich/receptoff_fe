import * as React from 'react'
import { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = ({ className, color, width, height, onClick }) => {
    let classes = `icon_wrapper arrow_down_icon ${className}`
    return <svg viewBox="0 0 24 24" onClick={onClick} color={color} width={width ? width : 24} height={height ? height : 24} className={classes}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z" fill='#2B7A78' />
    </svg>
}
export default ArrowDownIcon;