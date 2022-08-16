import { Filter } from '@yext/search-headless-react';

export interface DisplayableFilter {
  filterType: 'NLP_FILTER' | 'STATIC_FILTER' | 'FACET',
  filter: Filter,
  groupLabel: string,
  label: string
}
