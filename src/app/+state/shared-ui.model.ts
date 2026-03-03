export interface BaseUIState {
  loading: boolean;
  searchTerm: string;
  selectedTab: string;
  sidebarOpen: boolean;
}

export const baseUIInitialState: BaseUIState = {
  loading: false,
  searchTerm: '',
  selectedTab: 'all',
  sidebarOpen: true,
};
