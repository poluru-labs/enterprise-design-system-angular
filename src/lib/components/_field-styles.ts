/** Shared field chrome styles for text-like form controls. */
export const EDS_FIELD_STYLES = `
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--eds-font-sans);
    color: var(--eds-color-text);
    -webkit-font-smoothing: antialiased;
  }

  .eds-field {
    display: flex;
    flex-direction: column;
    gap: var(--eds-space-2);
    width: 100%;
  }

  .eds-label {
    font-size: var(--eds-font-size-sm);
    font-weight: var(--eds-font-weight-semibold);
    color: var(--eds-color-text);
  }

  .eds-hint,
  .eds-error {
    font-size: var(--eds-font-size-xs);
    line-height: var(--eds-line-height-normal);
  }

  .eds-hint {
    color: var(--eds-color-text-subtle);
  }

  .eds-error {
    color: var(--eds-color-danger-600);
  }

  .eds-control {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 2.5rem;
    padding: 0 var(--eds-space-3);
    border: 1px solid var(--eds-color-border-strong);
    border-radius: var(--eds-radius-md);
    background: var(--eds-color-surface);
    color: var(--eds-color-text);
    font: inherit;
    font-size: var(--eds-font-size-md);
    transition:
      border-color var(--eds-duration-fast) var(--eds-easing-standard),
      box-shadow var(--eds-duration-fast) var(--eds-easing-standard);
  }

  .eds-control:hover:not(.eds-control--disabled) {
    border-color: var(--eds-color-ink-400);
  }

  .eds-control:focus-within {
    outline: none;
    border-color: var(--eds-color-primary);
    box-shadow: var(--eds-shadow-focus);
  }

  .eds-control--disabled {
    opacity: 0.55;
    cursor: not-allowed;
    background: var(--eds-color-ink-50);
  }

  .eds-control--invalid {
    border-color: var(--eds-color-danger-600);
  }

  .eds-control--sm {
    min-height: 2rem;
    font-size: var(--eds-font-size-sm);
  }

  .eds-control--lg {
    min-height: 3rem;
    font-size: var(--eds-font-size-lg);
  }
`;
