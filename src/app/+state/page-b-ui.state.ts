import {
  createAction,
  createFeature,
  createReducer,
  on,
  props,
  ActionReducer,
} from '@ngrx/store';
import { createUIStateSlice } from './shared-ui.factory';
import { composeReducers } from './reducer-utils';
import { BaseUIState } from './shared-ui.model';

export type FilterMode = 'simple' | 'advanced';

export interface PageBExtra {
  filterMode: FilterMode;
  columnLayout: number;
}

export type PageBUIState = BaseUIState & PageBExtra;

const slice = createUIStateSlice<PageBExtra>('pageBUI', {
  filterMode: 'simple',
  columnLayout: 3,
});

const pageBSpecificActions = {
  setFilterMode: createAction(
    '[PageB UI] Set Filter Mode',
    props<{ mode: FilterMode }>()
  ),
  setColumnLayout: createAction(
    '[PageB UI] Set Column Layout',
    props<{ columns: number }>()
  ),
};

export const PageBActions = {
  ...slice.actions,
  ...pageBSpecificActions,
};

const extraReducer: ActionReducer<PageBUIState> = createReducer(
  slice.initialState,
  on(
    pageBSpecificActions.setFilterMode,
    (state, { mode }): PageBUIState => ({
      ...state,
      filterMode: mode,
    })
  ),
  on(
    pageBSpecificActions.setColumnLayout,
    (state, { columns }): PageBUIState => ({
      ...state,
      columnLayout: columns,
    })
  )
);

export const pageBUIFeature = createFeature({
  name: 'pageBUI',
  reducer: composeReducers(slice.baseReducer, extraReducer),
});
