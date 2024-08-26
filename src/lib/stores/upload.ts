import { writable } from 'svelte/store';

export const titleStore = writable('');
export const artistStore = writable([]);
export const categorieStore = writable([]);
export const imageStore = writable<File[]>([]);
