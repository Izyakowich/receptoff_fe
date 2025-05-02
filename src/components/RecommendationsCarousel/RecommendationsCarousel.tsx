import React, { useState } from 'react';
import styles from './RecommendationsCarousel.module.scss';
import { useNavigate } from 'react-router-dom';

export type Recommendation = {
    id: number;
    product_name: string;
    photo: string;
};

interface RecommendationsCarouselProps {
    recommendations: Recommendation[];
}

const RecommendationsCarousel: React.FC<RecommendationsCarouselProps> = ({ recommendations }) => {
    const [startIndex, setStartIndex] = useState(0);
    const navigate = useNavigate();
    const visibleCount = 3;
    const canScrollLeft = startIndex > 0;
    const canScrollRight = startIndex + visibleCount < recommendations.length;

    const handlePrev = () => {
        if (canScrollLeft) setStartIndex(startIndex - 1);
    };
    const handleNext = () => {
        if (canScrollRight) setStartIndex(startIndex + 1);
    };

    const visible = recommendations.slice(startIndex, startIndex + visibleCount);

    return (
        <div className={styles.carousel__wrapper}>
            <div className={styles.carousel__header}>Персональные рекомендации</div>
            <div className={styles.carousel__container}>
                {recommendations.length > visibleCount && (
                    <button className={styles.carousel__arrow} onClick={handlePrev} disabled={!canScrollLeft}>&lt;</button>
                )}
                <div className={styles.carousel__cards}>
                    {visible.map(rec => (
                        <div
                            key={rec.id}
                            className={styles.carousel__card}
                            onClick={() => navigate(`/products/${rec.id}`)}
                        >
                            <img src={rec.photo} alt={rec.product_name} className={styles.carousel__image} />
                            <div className={styles.carousel__title}>{rec.product_name}</div>
                        </div>
                    ))}
                </div>
                {recommendations.length > visibleCount && (
                    <button className={styles.carousel__arrow} onClick={handleNext} disabled={!canScrollRight}>&gt;</button>
                )}
            </div>
        </div>
    );
};

export default RecommendationsCarousel; 