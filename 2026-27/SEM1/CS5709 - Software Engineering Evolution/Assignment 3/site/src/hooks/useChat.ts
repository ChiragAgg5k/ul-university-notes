/**
 * @file Connects React to the chat loader and starts background loading for returning visitors.
 */
import { useEffect, useSyncExternalStore } from 'react';
import { currentStatus, load, remembered, subscribe } from '../chat/loader.ts';
import type { ChatStatus } from '../chat/loader.ts';

export function useChat(): ChatStatus {
  useEffect(() => {
    if (remembered()) {
      load(false);
    }
  }, []);
  return useSyncExternalStore(subscribe, currentStatus);
}
