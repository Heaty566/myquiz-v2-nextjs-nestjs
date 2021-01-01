import { useState, useEffect, useRef, useCallback } from 'react';

import * as React from 'react';

interface useComponentProps<T> {
        Loading?: React.FunctionComponent;
        RefComponent: React.ComponentType<T>;
        offset: number;
        isRender?: boolean;
}

export function useComponent<T>({
        RefComponent,
        offset = 200,
        Loading = () => <h1>Loading...</h1>,
        isRender = true,
}: useComponentProps<T>): [Function, boolean] {
        const wrapperRef = useRef<HTMLDivElement>(null);
        const [isIntersect, setIntersect] = useState(false);

        const handleOnIntersection = useCallback(() => {
                if (wrapperRef.current) {
                        const hT = wrapperRef.current.offsetTop;
                        const hH = wrapperRef.current.offsetHeight;
                        const wH = window.innerHeight;
                        const wS = window.pageYOffset;
                        if (wS + offset > hT + hH - wH) {
                                setIntersect(true);
                        }
                }
        }, [offset, wrapperRef.current]);

        useEffect(() => {
                handleOnIntersection();
                window.addEventListener('scroll', handleOnIntersection);

                return () => {
                        window.removeEventListener('scroll', handleOnIntersection);
                };
        }, [handleOnIntersection]);

        useEffect(() => {
                if (isIntersect && isRender) {
                        {
                                window.removeEventListener('scroll', handleOnIntersection);
                                setComponent(() => RefComponent);
                        }
                }
        }, [isIntersect, handleOnIntersection]);

        const [Component, setComponent] = useState<React.ComponentType<T>>();

        return [
                Component
                        ? (props: T) => <Component {...props} />
                        : () => (
                                  <div ref={wrapperRef}>
                                          <Loading />
                                  </div>
                          ),
                isIntersect,
        ];
}
