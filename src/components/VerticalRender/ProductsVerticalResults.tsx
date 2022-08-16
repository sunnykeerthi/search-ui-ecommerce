import { CardComponent, CardConfigTypes } from "../../models/cardComponent";
import { useSearchState, Result } from "@yext/search-headless-react";
import classNames from "classnames";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";

interface VerticalResultsCssClasses {
  results___loading?: string;
  container?: string;
}

const builtInCssClasses: VerticalResultsCssClasses = {
  results___loading: "opacity-50",
};

interface VerticalResultsDisplayProps {
  CardComponent: CardComponent;
  cardConfig?: CardConfigTypes;
  isLoading?: boolean;
  results: Result[];
  customCssClasses?: VerticalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
  isGrid?: boolean;
}

/**
 * A Component that displays all the search results for a given vertical.
 *
 * @param props - The props for the Component, including the results and the card type
 *                to be used.
 */
export function ProductsVerticalResultsDisplay(
  props: VerticalResultsDisplayProps
): JSX.Element | null {
  const {
    CardComponent,
    results,
    cardConfig = {},
    isLoading = false,
    customCssClasses,
    cssCompositionMethod,
    isGrid = true,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );

  if (results.length === 0) {
    return null;
  }

  const resultsClassNames = cssClasses.results___loading
    ? classNames(
        { [cssClasses.results___loading]: isLoading },
        cssClasses.container
      )
    : "";

  return (
    <>
      {results &&
        results.map((result) =>
          renderResult(CardComponent, cardConfig, result)
        )}
    </>
  );
}

/**
 * Renders a single result using the specified card type and configuration.
 *
 * @param CardComponent - The card for the vertical.
 * @param cardConfig - Any card-specific configuration.
 * @param result - The result to render.
 */
function renderResult(
  CardComponent: CardComponent,
  cardConfig: CardConfigTypes,
  result: Result
): JSX.Element {
  return (
    <CardComponent
      result={result}
      configuration={cardConfig}
      key={result.id || result.index}
    />
  );
}

interface VerticalResultsProps {
  CardComponent: CardComponent;
  cardConfig?: CardConfigTypes;
  displayAllResults?: boolean;
  customCssClasses?: VerticalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export default function ProductsVerticalResults(
  props: VerticalResultsProps
): JSX.Element | null {
  const { displayAllResults = true, ...otherProps } = props;

  const verticalResults =
    useSearchState((state) => state.vertical.results) || [];
  const allResultsForVertical =
    useSearchState(
      (state) => state.vertical?.noResults?.allResultsForVertical.results
    ) || [];
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  const results =
    verticalResults.length === 0 && displayAllResults
      ? allResultsForVertical
      : verticalResults;

  return (
    <ProductsVerticalResultsDisplay
      results={results}
      isLoading={isLoading}
      {...otherProps}
    />
  );
}
