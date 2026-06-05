import { useCallback, useState } from "react";

export interface EntityPageState<T> {
    original: T | null;
    current: T | null;
}

export function useEntityState<T>() {
    const [entityState, setEntityState] = useState<EntityPageState<T>>({ original: null, current: null });

    const handleFormUpdate = useCallback((value: any, field: string) => {
        setEntityState(prev => ({
            ...prev,
            current: prev.current ? { ...prev.current, [field as keyof T]: value } : null
        }));
    }, []);

    const hasChanges = useCallback(() => {
        return JSON.stringify(entityState.original) !== JSON.stringify(entityState.current);
    }, [entityState]);

    const setEntity = useCallback((entity: T | null) => {
        setEntityState({ original: entity, current: entity });
    }, []);

    const clearEntity = useCallback(() => {
        setEntityState({ original: null, current: null });
    }, []);

    return {
        entityState,
        handleFormUpdate,
        hasChanges,
        setEntity,
        clearEntity
    };
}
