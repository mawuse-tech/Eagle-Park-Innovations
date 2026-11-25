const unsubscribeTokenStorageKey = "epi-newsletter-unsubscribe-token";
const unsubscribeTokenChanged = "epi-newsletter-unsubscribe-token-changed";
let inMemoryToken: string | null | undefined;

export function isUnsubscribeToken(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

export function readUnsubscribeToken() {
  if (inMemoryToken !== undefined) return inMemoryToken;
  try {
    return window.localStorage.getItem(unsubscribeTokenStorageKey);
  } catch {
    return null;
  }
}

export function saveUnsubscribeToken(token: string | null) {
  try {
    if (token === null) {
      window.localStorage.removeItem(unsubscribeTokenStorageKey);
    } else {
      window.localStorage.setItem(unsubscribeTokenStorageKey, token);
    }
    inMemoryToken = undefined;
  } catch {
    inMemoryToken = token;
  }
  window.dispatchEvent(new Event(unsubscribeTokenChanged));
}

export function watchUnsubscribeToken(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === unsubscribeTokenStorageKey || event.key === null) {
      onChange();
    }
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(unsubscribeTokenChanged, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(unsubscribeTokenChanged, onChange);
  };
}
