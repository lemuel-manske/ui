import { Icon } from '../icon';
import { Input } from '../input';
import { List } from '../list';
import { Spinner } from '../spinner';
import { Text } from '../text';

import type { ExplorerMessages, ExplorerProps } from './types';

import { useExplorer } from './useExplorer';

import styles from './Explorer.module.css';

function renderLoadingContent(messages: ExplorerMessages) {
  return (
    <div className={styles.loading}>
      <Spinner label={messages.loadingMessage} />
    </div>
  );
}

function renderEmptyContent(messages: ExplorerMessages) {
  return (
    <p className={styles.message}>
      <Text size="small" tone="secondary">
        {messages.emptyMessage}
      </Text>
    </p>
  );
}

type ExplorerResultState = Pick<
  ReturnType<typeof useExplorer>,
  'activeIndex' | 'groupedResults' | 'listboxId' | 'selectItem' | 'setActiveIndex'
>;

function renderResultsContent(messages: ExplorerMessages, explorer: ExplorerResultState) {
  let resultIndex = 0;

  return (
    <List
      marker="none"
      id={explorer.listboxId}
      className={styles.results}
      role="listbox"
      aria-label={messages.resultsLabel}
    >
      {explorer.groupedResults.map((group, groupIndex) => (
        <div
          key={group.group ?? groupIndex}
          className={styles.group}
          role="group"
          aria-label={group.group}
        >
          {group.group != null && (
            <p className={styles.groupLabel}>
              <Text size="small" tone="secondary">
                {group.group}
              </Text>
            </p>
          )}

          <List marker="none" className={styles.groupResults} role="presentation">
            {group.items.map((item) => {
              const index = resultIndex++;
              const isActive = index === explorer.activeIndex;

              return (
                <List.Item
                  key={item.id}
                  id={`${explorer.listboxId}-option-${index}`}
                  role="option"
                  aria-selected={isActive}
                  className={styles.option}
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
                </List.Item>
              );
            })}
          </List>
        </div>
      ))}
    </List>
  );
}

/** Persistent, localized search surface composed from shared UI primitives. */
function Explorer(props: ExplorerProps) {
  const { query, results = [], messages, loading = false } = props;

  const {
    activeIndex,
    activeItem,
    groupedResults,
    isOpen,
    listboxId,
    handleKeyDown,
    handleQueryChange,
    selectItem,
    setActiveIndex,
  } = useExplorer(props);

  const resultState = {
    activeIndex,
    groupedResults,
    listboxId,
    selectItem,
    setActiveIndex,
  };

  const resultContent = (() => {
    if (loading) {
      return renderLoadingContent(messages);
    }

    if (results.length === 0) {
      return renderEmptyContent(messages);
    }

    return renderResultsContent(messages, resultState);
  })();

  const isListboxActive = isOpen && !loading && results.length > 0;
  const hasActiveItem = isListboxActive && activeItem != null;

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
          aria-expanded={isOpen}
          aria-controls={isListboxActive ? listboxId : undefined}
          aria-activedescendant={hasActiveItem ? `${listboxId}-option-${activeIndex}` : undefined}
          value={query}
          placeholder={messages.searchPlaceholder}
          onChange={(event) => handleQueryChange(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />

        {query.length > 0 && (
          <Icon
            size="medium"
            label={messages.clearSearchLabel}
            onClick={() => handleQueryChange('')}
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

      {isOpen && <div className={styles.popover}>{resultContent}</div>}
    </div>
  );
}

export { Explorer };
