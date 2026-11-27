import { useId, useMemo, useState } from 'react';

import type { KeyboardEvent } from 'react';

import type { ExplorerItem, ExplorerProps } from './types';

function useExplorer({
  query,
  results = [],
  onQueryChange,
  onSelect,
  loading = false,
}: Pick<ExplorerProps, 'query' | 'results' | 'onQueryChange' | 'onSelect' | 'loading'>) {
  const listboxId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const hasQuery = query.trim().length > 0;
  const isOpen = hasQuery && !dismissed;
  const activeItem = results[activeIndex];

  const groupedResults = useMemo(() => {
    return results.reduce<{ group?: string; items: ExplorerItem[] }[]>((groups, item) => {
      const lastGroup = groups[groups.length - 1];

      if (lastGroup?.group === item.group) {
        lastGroup.items.push(item);
      } else {
        groups.push({ group: item.group, items: [item] });
      }

      return groups;
    }, []);
  }, [results]);

  function handleQueryChange(value: string) {
    setActiveIndex(0);
    setDismissed(false);
    onQueryChange(value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setDismissed(true);
      setActiveIndex(0);
      return;
    }

    if (!isOpen || loading || results.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    }

    if (event.key === 'Enter' && activeItem != null) {
      event.preventDefault();
      onSelect?.(activeItem);
    }
  }

  function selectItem(item: ExplorerItem) {
    onSelect?.(item);
  }

  return {
    activeIndex,
    activeItem,
    groupedResults,
    isOpen,
    listboxId,
    handleKeyDown,
    handleQueryChange,
    selectItem,
    setActiveIndex,
  };
}

export { useExplorer };
