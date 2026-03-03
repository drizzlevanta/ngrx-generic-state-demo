import { Component, inject, computed } from '@angular/core';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { pageBUIFeature, PageBActions, FilterMode } from '../../+state/page-b-ui.state';
import { DEMO_PRODUCTS } from './page-b.mock-data';

@Component({
  standalone: true,
  imports: [TitleCasePipe, CurrencyPipe],
  selector: 'app-page-b',
  templateUrl: './page-b.component.html',
  styleUrl: './page-b.component.scss',
})
export class PageBComponent {
  private readonly store = inject(Store);

  readonly loading = this.store.selectSignal(pageBUIFeature.selectLoading);
  readonly searchTerm = this.store.selectSignal(pageBUIFeature.selectSearchTerm);
  readonly selectedTab = this.store.selectSignal(pageBUIFeature.selectSelectedTab);
  readonly sidebarOpen = this.store.selectSignal(pageBUIFeature.selectSidebarOpen);
  readonly filterMode = this.store.selectSignal(pageBUIFeature.selectFilterMode);
  readonly columnLayout = this.store.selectSignal(pageBUIFeature.selectColumnLayout);

  readonly tabs = ['all', 'audio', 'input', 'display', 'accessories'];
  private readonly products = DEMO_PRODUCTS;

  readonly gridColumns = computed(
    () => `repeat(${this.columnLayout()}, 1fr)`
  );

  filteredProducts() {
    const term = this.searchTerm().toLowerCase();
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.store.dispatch(PageBActions.setSearchTerm({ term }));
  }

  selectTab(tab: string): void {
    this.store.dispatch(PageBActions.setSelectedTab({ tab }));
  }

  toggleSidebar(): void {
    this.store.dispatch(PageBActions.toggleSidebar());
  }

  toggleLoading(): void {
    this.store.dispatch(PageBActions.setLoading({ loading: !this.loading() }));
  }

  setFilterMode(mode: FilterMode): void {
    this.store.dispatch(PageBActions.setFilterMode({ mode }));
  }

  onColumnChange(event: Event): void {
    const columns = Number((event.target as HTMLInputElement).value);
    this.store.dispatch(PageBActions.setColumnLayout({ columns }));
  }
}
