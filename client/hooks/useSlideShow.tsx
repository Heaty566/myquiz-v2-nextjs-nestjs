import { useCallback, useEffect, useState } from 'react';

export function useSlideShow(total: number, delay: number): [Function, number] {
        const [current, setCurrent] = useState(0);
        const [isFocus, setIsFocus] = useState(true);
        function circle(value: number) {
                if (value > total - 1) return 0;
                if (value < 0) return total - 1;
                return value;
        }

        const setActive = useCallback(
                (index: number) => {
                        if (index === current) return 'slide__in';
                        else if (index === circle(current - 1)) return 'slide__out';

                        return 'slide__reset';
                },
                [current],
        );

        useEffect(() => {
                window.addEventListener('focus', () => setIsFocus(true), false);
                window.addEventListener('blur', () => setIsFocus(false), false);

                return () => {
                        window.removeEventListener('focus', () => setIsFocus(true), false);
                        window.removeEventListener('blur', () => setIsFocus(false), false);
                };
        }, []);

        useEffect(() => {
                const intervalId = setInterval(() => {
                        if (isFocus) setCurrent((state) => circle(state + 1));
                }, delay);

                return () => {
                        clearInterval(intervalId);
                };
        }, [isFocus]);

        return [setActive, current];
}
