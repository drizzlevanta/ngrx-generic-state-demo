import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  on,
  props,
  ActionReducer,
} from '@ngrx/store';
import { createUIStateSlice } from './shared-ui.factory';
import { composeReducers } from './reducer-utils';
import { BaseUIState } from './shared-ui.model';

export interface PageAExtra {
  showPreviewPanel: boolean;
  previewItemId: string | null;
}

export type PageAUIState = BaseUIState & PageAExtra;

const slice = createUIStateSlice<PageAExtra>('pageAUI', {
  showPreviewPanel: false,
  previewItemId: null,
});

const pageASpecificActions = createActionGroup({
  source: 'PageA UI',
  events: {
    'Toggle Preview': emptyProps(),
    'Select Preview Item': props<{ id: string }>(),
  },
});

export const PageAActions = {
  ...slice.actions,
  ...pageASpecificActions,
};

const extraReducer: ActionReducer<PageAUIState> = createReducer(
  slice.initialState,
  on(
    pageASpecificActions.togglePreview,
    (state): PageAUIState => ({
      ...state,
      showPreviewPanel: !state.showPreviewPanel,
    })
  ),
  on(
    pageASpecificActions.selectPreviewItem,
    (state, { id }): PageAUIState => ({
      ...state,
      previewItemId: id,
      showPreviewPanel: true,
    })
  )
);

export const pageAUIFeature = createFeature({
  name: 'pageAUI',
  reducer: composeReducers(slice.baseReducer, extraReducer),
});
