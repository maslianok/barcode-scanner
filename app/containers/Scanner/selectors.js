import { createSelector } from 'reselect';

export const selectScanner = () => state => state.scanner;

export const selectCodes = () =>
  createSelector(selectScanner(), scanner => scanner.codes);
