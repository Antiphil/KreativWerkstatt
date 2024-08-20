import { writable } from 'svelte/store';

export const titleStore = writable('');
export const authorStore = writable([]);
export const categorieStore = writable([]);
export const imageStore = writable([]);
export const thumbnailStore = writable(null);
