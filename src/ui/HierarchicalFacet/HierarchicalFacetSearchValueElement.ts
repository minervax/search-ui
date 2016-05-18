﻿import {FacetValueElement} from '../Facet/FacetValueElement';
import {HierarchicalFacet} from '../HierarchicalFacet/HierarchicalFacet';
import {ValueElementEventsBinding} from '../Facet/ValueElement';
import {FacetValue} from '../Facet/FacetValues';

export class HierarchicalFacetSearchValueElement extends FacetValueElement {
  constructor(public facet: HierarchicalFacet, public facetValue: FacetValue, public keepDisplayedValueNextTime: boolean) {
    super(facet, facetValue, keepDisplayedValueNextTime);
  }

  public _handleSelectValue(eventBindings: ValueElementEventsBinding) {
    this.facet.open(this.facetValue);
    super.handleSelectValue(eventBindings);
  }

  public _handleExcludeClick(eventBindings: ValueElementEventsBinding) {
    this.facet.open(this.facetValue);
    super.handleExcludeClick(eventBindings);
  }
}
