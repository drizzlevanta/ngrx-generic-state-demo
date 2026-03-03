import { Component, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { pageAUIFeature, PageAActions } from '../../+state/page-a-ui.state';
import { DEMO_ITEMS } from './page-a.mock-data';

@Component({
  standalone: true,
  imports: [TitleCasePipe],
  selector: 'app-page-a',
  templateUrl: './page-a.component.html',
  styleUrl: './page-a.component.scss',
})
export class PageAComponent {
  private readonly store = inject(Store);

  readonly loading = this.store.selectSignal(pageAUIFeature.selectLoading);
  readonly searchTerm = this.store.selectSignal(pageAUIFeature.selectSearchTerm);
  readonly selectedTab = this.store.selectSignal(pageAUIFeature.selectSelectedTab);
  readonly sidebarOpen = this.store.selectSignal(pageAUIFeature.selectSidebarOpen);
  readonly showPreview = this.store.selectSignal(pageAUIFeature.selectShowPreviewPanel);
  readonly previewItemId = this.store.selectSignal(pageAUIFeature.selectPreviewItemId);

  readonly tabs = ['all', 'documents', 'reports', 'specs'];
  private readonly items = DEMO_ITEMS;

  filteredItems() {
    const term = this.searchTerm().toLowerCase();
    return this.items.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }

  getItem(id: string) {
    return this.items.find((i) => i.id === id) ?? null;
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.store.dispatch(PageAActions.setSearchTerm({ term }));
  }

  selectTab(tab: string): void {
    this.store.dispatch(PageAActions.setSelectedTab({ tab }));
  }

  toggleSidebar(): void {
    this.store.dispatch(PageAActions.toggleSidebar());
  }

  toggleLoading(): void {
    this.store.dispatch(PageAActions.setLoading({ loading: !this.loading() }));
  }

  togglePreview(): void {
    this.store.dispatch(PageAActions.togglePreview());
  }

  selectItem(id: string): void {
    this.store.dispatch(PageAActions.selectPreviewItem({ id }));
  }
}
