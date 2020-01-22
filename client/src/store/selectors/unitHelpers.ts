import store from 'store';
import { MAX_UNITS } from 'appConstants';

export const getUnits = () => store.getState().units;

export const getNumUnits = () => getUnits().length;

export const getUnitByUuid = (uuid?: string) => getUnits().find(unit => unit.uuid === uuid);

export const getUnitIndexByUuid = (uuid?: string) => getUnits().findIndex(unit => unit.uuid === uuid);

export const getUnitByPosition = (index: number) => getUnits()[index];

export const addUnitEnabled = () => getUnits().length < MAX_UNITS;
