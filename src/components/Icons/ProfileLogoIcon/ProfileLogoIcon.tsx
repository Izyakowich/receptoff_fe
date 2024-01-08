import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'

const ProfileLogoIcon: React.FC<IconProps> = ({ className, color, width, height }) => {
    return <Icon viewBox="0 0 24 24" color={color} width={width ? width : 33} height={height ? height : 33} className={'icon_wrapper' + ` ${className}`} >
        <svg xmlns="http://www.w3.org/2000/svg" width="33px" height="33px" viewBox="0 0 24 24" fill="none">
            <path d="M14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5Z" fill="#f6881b"/>
            <path d="M15.5812 16H8.50626C8.09309 16 7.87415 15.5411 8.15916 15.242C9.00598 14.3533 10.5593 13 12.1667 13C13.7899 13 15.2046 14.3801 15.947 15.2681C16.2011 15.5721 15.9774 16 15.5812 16Z" fill="#f6881b" stroke="#f6881b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="#f6881b" stroke-width="2"/>
        </svg>
    </Icon>
}

export default ProfileLogoIcon;