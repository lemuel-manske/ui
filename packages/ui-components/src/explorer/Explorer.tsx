import { useId, useState } from 'react';

import type { KeyboardEvent } from 'react';

import type { ExplorerProps } from './types';

import styles from './Explorer.module.css';

/** Persistent search surface with application-supplied results and keyboard navigation. */
function Explorer({
  query,
  results = [],
  'aria-label': ariaLabel = 'Search',
  placeholder = 'Search...',
  onQueryChange,
  onSelect,
  loading = false,
  emptyMessage = 'No results found.',
}: ExplorerProps) {
  const listboxId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const hasQuery = query.trim().length > 0;
  const isOpen = hasQuery && !dismissed;
  const activeItem = results[activeIndex];
  const groupedResults = results.reduce<{ group?: string; items: typeof results }[]>(
    (groups, item) => {
      const lastGroup = groups[groups.length - 1];

      if (lastGroup?.group === item.group) {
        lastGroup.items.push(item);
      } else {
        groups.push({ group: item.group, items: [item] });
      }

      return groups;
    },
    [],
  );

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

    if (!isOpen || results.length === 0) {
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

  let resultContent = null;

  if (loading) {
    resultContent = <p className={styles.message} role="status">Searching...</p>;
  } else if (results.length === 0) {
    resultContent = <p className={styles.message}>{emptyMessage}</p>;
  } else {
    let resultIndex = 0;

    resultContent = (
      <ul id={listboxId} className={styles.results} role="listbox" aria-label="Search results">
        {groupedResults.map((group, groupIndex) => (
          <li key={group.group ?? groupIndex} className={styles.group}>
            {group.group != null && <p className={styles.groupLabel}>{group.group}</p>}

            <ul className={styles.groupResults}>
              {group.items.map((item) => {
                const index = resultIndex++;
                const isActive = index === activeIndex;

                return (
                  <li
                    key={item.id}
                    id={`${listboxId}-option-${item.id}`}
                    role="option"
                    aria-selected={isActive}
                    className={styles.option}
                    data-active={isActive || undefined}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => onSelect?.(item)}
                  >
                    <span className={styles.optionLabel}>{item.label}</span>
                    {item.description != null && (
                      <span className={styles.description}>{item.description}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.inputContainer}>
        <svg
          aria-hidden="true"
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          focusable="false"
        >
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m15.5 15.5 4.2 4.2" />
        </svg>

        <input
          type="search"
          role="combobox"
          aria-label={ariaLabel}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen && results.length > 0 ? listboxId : undefined}
          aria-activedescendant={
            isOpen && results.length > 0 && activeItem != null
              ? `${listboxId}-option-${activeItem.id}`
              : undefined
          }
          className={styles.input}
          value={query}
          placeholder={placeholder}
          onChange={(event) => handleQueryChange(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        {query.length > 0 && (
          <button
            type="button"
            className={styles.clear}
            aria-label="Clear search"
            onClick={() => handleQueryChange('')}
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" focusable="false">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.popover}>
          {resultContent}
        </div>
      )}
    </div>
  );
}

export { Explorer };
