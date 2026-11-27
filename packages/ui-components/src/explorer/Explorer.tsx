import { Icon } from '../icon';
import { Input } from '../input';
import { Spinner } from '../spinner';
import { Text } from '../text';

import type { ExplorerProps } from './types';

import { useExplorer } from './useExplorer';

import styles from './Explorer.module.css';

/** Persistent, localized search surface composed from shared UI primitives. */
function Explorer({
  query,
  results = [],
  messages,
  onQueryChange,
  onSelect,
  loading = false,
}: ExplorerProps) {
  const explorer = useExplorer({ query, results, onQueryChange, onSelect, loading });

  let resultContent = null;

  if (loading) {
    resultContent = <Spinner label={messages.loadingMessage} />;
  } else if (results.length === 0) {
    resultContent = (
      <p className={styles.message}>
        <Text size="small" tone="secondary">{messages.emptyMessage}</Text>
      </p>
    );
  } else {
    let resultIndex = 0;

    resultContent = (
      <ul
        id={explorer.listboxId}
        className={styles.results}
        role="listbox"
        aria-label={messages.resultsLabel}
      >
        {explorer.groupedResults.map((group, groupIndex) => (
          <li
            key={group.group ?? groupIndex}
            className={styles.group}
            role="group"
            aria-label={group.group}
          >
            {group.group != null && (
              <p className={styles.groupLabel}>
                <Text size="small" tone="secondary">{group.group}</Text>
              </p>
            )}

            <ul className={styles.groupResults} role="presentation">
              {group.items.map((item) => {
                const index = resultIndex++;
                const isActive = index === explorer.activeIndex;

                return (
                  <li
                    key={item.id}
                    id={`${explorer.listboxId}-option-${index}`}
                    role="option"
                    aria-selected={isActive}
                    className={styles.option}
                    data-active={isActive || undefined}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseMove={() => explorer.setActiveIndex(index)}
                    onClick={() => explorer.selectItem(item)}
                  >
                    <span className={styles.optionLabel}>
                      <Text as="span">{item.label}</Text>
                    </span>
                    {item.description != null && (
                      <span className={styles.description}>
                        <Text as="span" size="small" tone="secondary">
                          {item.description}
                        </Text>
                      </span>
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
        <Icon size="medium">
          <svg viewBox="0 0 24 24">
            <circle
              cx="10.8"
              cy="10.8"
              r="6.3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="m15.5 15.5 4.2 4.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </Icon>

        <Input
          type="search"
          role="combobox"
          aria-label={messages.searchLabel}
          aria-autocomplete="list"
          aria-expanded={explorer.isOpen}
          aria-controls={
            explorer.isOpen && !loading && results.length > 0
              ? explorer.listboxId
              : undefined
          }
          aria-activedescendant={
            explorer.isOpen && !loading && results.length > 0 && explorer.activeItem != null
              ? `${explorer.listboxId}-option-${explorer.activeIndex}`
              : undefined
          }
          value={query}
          placeholder={messages.searchPlaceholder}
          onChange={(event) => explorer.handleQueryChange(event.currentTarget.value)}
          onKeyDown={explorer.handleKeyDown}
        />
        {query.length > 0 && (
          <Icon
            size="medium"
            label={messages.clearSearchLabel}
            onClick={() => explorer.handleQueryChange('')}
          >
            <svg viewBox="0 0 20 20">
              <path
                d="m5 5 10 10M15 5 5 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </Icon>
        )}
      </div>

      {explorer.isOpen && <div className={styles.popover}>{resultContent}</div>}
    </div>
  );
}

export { Explorer };
