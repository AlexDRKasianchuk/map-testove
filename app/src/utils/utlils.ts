import { Entity } from '../store/entity';
import L from 'leaflet';
import ArrowNorth from '../assets/arrow_north.svg';
import ArrowSouth from '../assets/arrow_south.svg';
import ArrowWest from '../assets/arrow_west.svg';
import ArrowEast from '../assets/arrow_east.svg';
import Circle from '../assets/circle.svg';

let oldData: Entity[] = [];

export const entityMapper = (entity: Entity[]) => {
    return updateData(entity).map((en: Entity) => {
        const enImg = getImage(en.direction, !!en.isOld);
        return { ...en, img: enImg };
    });
};

const getImage = (direction: string, isOld: boolean) => {
    if (direction === 'west') return customIcon(ArrowWest, isOld);
    if (direction === 'east') return customIcon(ArrowEast, isOld);
    if (direction === 'north') return customIcon(ArrowNorth, isOld);
    if (direction === 'south') return customIcon(ArrowSouth, isOld);
    return customIcon(Circle, isOld);
};

const customIcon = (img: string, isActive: boolean) =>
    new L.Icon({
        iconUrl: img,
        className: isActive ? 'marker' : undefined,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, 0]
    });

const getCurrentTime = () => new Date().getTime();

export const updateData = (data: Entity[]) => {
    const currentTime = getCurrentTime();

    const tempData = oldData
        .filter((e) => !data.find((x) => x.id === e.id))
        .filter((e) => currentTime - e.oldTimestamp <= 300000)
        .map((x) => ({ ...x, isOld: true }));
    data = data.map((en: Entity) => ({ ...en, isOld: false, oldTimestamp: currentTime }));
    oldData = data.concat(tempData);

    return oldData;
};
