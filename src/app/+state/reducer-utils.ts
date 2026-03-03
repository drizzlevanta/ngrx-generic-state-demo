import { Action, ActionReducer } from '@ngrx/store';


// The factory produces a baseReducer for shared UI state (loading, searchTerm, etc.),
// while each feature defines its own extraReducer for page-specific actions.
// These two reducers are created separately, and we can't combine their `on()` handlers
// into a single createReducer call at the factory level because the feature-specific
// actions and state shape aren't known until the consumer defines them.
// composeReducers chains them so both reducers process every action in sequence,
// giving us one combined ActionReducer to pass to createFeature.
export function composeReducers<TState>(
  baseReducer: ActionReducer<TState>,
  extraReducer: ActionReducer<TState>
): ActionReducer<TState> {
  return (state: TState | undefined, action: Action): TState => {
    const intermediate = baseReducer(state, action);
    return extraReducer(intermediate, action);
  };
}
