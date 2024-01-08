import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'

const BurgerIcon: React.FC<IconProps> = ({ className, width, height, onClick }) => {
    let classes = `icon_wrapper ${className}`
    return <Icon viewBox="0 0 24 24" onClick={onClick} width={width ? width : 24} height={height ? height : 24} className={classes}>
        <path d="M4 18L20 18" stroke='#f6881b' stroke-width="2" stroke-linecap="round" />
        <path d="M4 12L20 12" stroke='#f6881b' stroke-width="2" stroke-linecap="round" />
        <path d="M4 6L20 6" stroke='#f6881b' stroke-width="2" stroke-linecap="round" />
    </Icon>
}
export default BurgerIcon;