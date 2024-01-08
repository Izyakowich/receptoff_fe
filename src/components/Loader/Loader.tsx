import * as React from 'react';

export type LoaderProps = {
    size?: 's' | 'm' | 'l' | 'xl';
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, className }) => {

    const pxSize = (size?: 's' | 'm' | 'l' | 'xl') => {
        switch (size) {
            case ('s'):
                return '24px'
            case ('m'):
                return '48px'
            case ('l'):
                return '80px'
            case ('xl'):
                return '120px'
            default:
                return '60px'
        }
    }
    return (
        <svg data-testid="loader" className={className} width={pxSize(size)} height={pxSize(size)} viewBox='0 0 24 24' fill="#2B7A78" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.3497 17.8462C10.1209 18.5916 6.89917 16.5785 6.15374 13.3497C5.40832 10.1209 7.42148 6.89919 10.6503 6.15377C13.879 5.40835 17.1008 7.42151 17.8462 10.6503L19.7949 10.2004C18.801 5.89534 14.5054 3.21113 10.2004 4.20503C5.89532 5.19893 3.21111 9.49456 4.205 13.7996C5.1989 18.1046 9.49454 20.7888 13.7996 19.795L13.3497 17.8462Z"
                fill='#2B7A78'
            />
        </svg>
    )
};

export default Loader;