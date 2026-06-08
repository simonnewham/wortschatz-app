import { Status } from '@/constants/Status';
import { useToast } from '@/providers/ToastProvider';
import baseEntityDataService from '@/services/BaseEntityDataService';
import { useCallback } from 'react';

export interface IUseBaseEntityProps {
    entity: string;
    viewRoute: string;
}

export function useBaseEntity({ entity, viewRoute }: IUseBaseEntityProps) {
    const toast = useToast();

    const onAdd = useCallback(async (data: any) => {
        if (!data) return { ok: false };
        try {
            const result = await baseEntityDataService.Create(entity, data);

            if (result.ok) {
                toast.show(`${entity} added successfully!`, Status.Success);
                const responseData = await result.json().catch(() => null);
                return { ok: true, data: responseData };
            } else {
                toast.show(`Failed to add ${entity.toLowerCase()}.`, Status.Error);
                return { ok: false };
            }
        } catch (err) {
            console.error(err, { logMessage: `Error adding ${entity.toLowerCase()}` });
            toast.show(`Failed to add ${entity.toLowerCase()}.`, Status.Error);
            return { ok: false };
        }
    }, [entity, viewRoute, toast]);

    const onUpdate = useCallback(async (data: any) => {
        if (!data) return { ok: false };
        try {
            const result = await baseEntityDataService.Update(entity, data);

            if (result.ok) {
                toast.show(`${entity} updated successfully!`, Status.Success);
                const responseData = await result.json().catch(() => null);
                return { ok: true, data: responseData };
            } else {
                toast.show(`Failed to update ${entity.toLowerCase()}.`, Status.Error);
                return { ok: false };
            }
        } catch (err) {
            console.error(err, { logMessage: `Error updating ${entity.toLowerCase()}` });
            toast.show(`Failed to update ${entity.toLowerCase()}.`, Status.Error);
            return { ok: false };
        }
    }, [entity, toast]);

    const onDelete = useCallback(async (id?: string) => {
        if (!id) return false;
        try {
            const result = await baseEntityDataService.Delete(entity, id);
            if (result.ok) {
                toast.show(`${entity} deleted successfully!`, Status.Success);
                return true;
            } else {
                toast.show(`Failed to delete ${entity.toLowerCase()}.`, Status.Error);
                return false;
            }
        } catch (err) {
            toast.show(`Failed to delete ${entity.toLowerCase()}.`, Status.Error);
            return false;
        }
    }, [entity, toast]);

    const onDetail = useCallback(async (id?: string) => {
        if (!id) return null;
        try {
            const result = await baseEntityDataService.GetDetail(entity, id);
            if (result.ok) {
                const responseData = await result.json();
                return responseData;
            } else {
                toast.show(`Failed to load ${entity.toLowerCase()} details.`, Status.Error);
                return null;
            }
        } catch (err) {
            toast.show(`Failed to load ${entity.toLowerCase()} details.`, Status.Error);
            return null;
        }
    }, [entity, toast]);

    const onEnhance = useCallback(async (data: any) => {
        if (!data) return { ok: false };
        try {
            const result = await baseEntityDataService.Enhance(entity, data);

            if (result.ok) {
                toast.show(`${entity} enhanced successfully!`, Status.Success);
                const responseData = await result.json().catch(() => null);
                return { ok: true, data: responseData.result };
            } else {
                toast.show(`Failed to enhance ${entity.toLowerCase()}.`, Status.Error);
                return { ok: false };
            }
        } catch (err) {
            toast.show(`Failed to enhance ${entity.toLowerCase()}.`, Status.Error);
            return { ok: false };
        }
    }, [entity, toast]);

    return {
        onAdd,
        onUpdate,
        onDelete,
        onDetail,
        onEnhance
    };
}
