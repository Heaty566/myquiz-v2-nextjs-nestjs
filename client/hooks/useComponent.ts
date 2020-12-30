import { useRef, useState, useEffect, RefObject, useCallback, Component } from 'react';

export function useComponent() {
        const [Com, setCom] = useState<any>(null);

        useEffect(() => {
                heelo();
        });

        const heelo = async () => {
                const get = await import('../components/card');
                setCom(get);
        };

        return [Com];
}
