import {
  createAction,
  createReducer,
  on,
  props,
  ActionReducer,
} from '@ngrx/store';
import { BaseUIState, baseUIInitialState } from './shared-ui.model';

export function createUIStateSlice<TExtra extends object>(
  featureKey: string,
  extraInitialState: TExtra
) {
  type CombinedState = BaseUIState & TExtra;

  const initialState = {
    ...baseUIInitialState,
    ...extraInitialState,
  } as CombinedState;

  const actions = {
    setLoading: createAction(
      `[${featureKey}] Set Loading`,
      props<{ loading: boolean }>()
    ),
    setSearchTerm: createAction(
      `[${featureKey}] Set Search Term`,
      props<{ term: string }>()
    ),
    setSelectedTab: createAction(
      `[${featureKey}] Set Selected Tab`,
      props<{ tab: string }>()
    ),
    toggleSidebar: createAction(`[${featureKey}] Toggle Sidebar`),
  };

  const baseReducer: ActionReducer<CombinedState> = createReducer(
    initialState,
    on(actions.setLoading, (state, { loading }) => ({
      ...state,
      loading,
    })),
    on(actions.setSearchTerm, (state, { term }) => ({
      ...state,
      searchTerm: term,
    })),
    on(actions.setSelectedTab, (state, { tab }) => ({
      ...state,
      selectedTab: tab,
    })),
    on(actions.toggleSidebar, (state) => ({
      ...state,
      sidebarOpen: !state.sidebarOpen,
    }))
  );

  return { actions, baseReducer, initialState };
}
