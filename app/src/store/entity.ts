import { useState } from 'react';
import { entityMapper } from '../utils/utlils';
import { DivIcon, Icon, IconOptions } from 'leaflet';

export interface Entity {
    oldTimestamp: number;
    id: number;
    position: [number, number];
    direction: string;
    img?: Icon<IconOptions> | DivIcon | undefined;
    isOld?: boolean;
}

interface EntityResponse {
    data: Entity[];
}

export const useEntityStore = () => {
    const [data, setData] = useState<Entity[]>([]);

    const getEntity = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:9000/entity', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token
                }
            });

            if (!response.ok) {
                throw new Error('Щось пішло не так');
            }

            const responseData: EntityResponse = await response.json();
            setData(entityMapper(responseData.data));
        } catch (error) {
            alert((error as Error).message);
            console.error('Помилка: ', error);
        }
    };

    const rerun = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch('http://localhost:9000/entity/rerun', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token
                }
            });

            await getEntity();
        } catch (error) {
            alert((error as Error).message);
            console.error('Помилка: ', error);
        }
    };

    return {
        data,
        rerun,
        getEntity
    };
};
