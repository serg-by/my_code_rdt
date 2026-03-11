import type { FormState } from "./types";
import { DEFAULT_FORM_STATE } from "./constants";

const STORAGE_KEY = "tilecalc_form_state";

export function loadState(): FormState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_FORM_STATE };
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === "object" && parsed !== null) {
      return mergeWithDefaults(parsed as Partial<FormState>);
    }
    return { ...DEFAULT_FORM_STATE };
  } catch {
    return { ...DEFAULT_FORM_STATE };
  }
}

export function saveState(state: FormState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silently fail if storage is full
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently fail
  }
}

function mergeWithDefaults(partial: Partial<FormState>): FormState {
  return {
    base: { ...DEFAULT_FORM_STATE.base, ...(partial.base ?? {}) },
    settings: { ...DEFAULT_FORM_STATE.settings, ...(partial.settings ?? {}) },
    resources: { ...DEFAULT_FORM_STATE.resources, ...(partial.resources ?? {}) },
    garrison: { ...DEFAULT_FORM_STATE.garrison, ...(partial.garrison ?? {}) },
  };
}
