import * as React from 'react'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    width?: number,
    height?: number,
    children?: React.ReactNode,
    onClick?: () => void
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ className, width, height, children, onClick }) => {
    return (
        <svg onClick={onClick} className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio='xMidYMid meet' width={width} height={height} fill="none">
            {children}
        </svg>
    )
}

export default Icon;