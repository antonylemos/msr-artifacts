import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID, inject } from '@angular/core';
export const LOCAL_STORAGE = new InjectionToken('LOCAL_STORAGE', {
    providedIn: 'root',
    factory: () => getStorage(inject(PLATFORM_ID)),
});
const getStorage = (platformId: any) => {
    return isPlatformBrowser(platformId) ? new LocalStorage() : null;
};
class LocalStorage {
    get length() {
        try {
            return localStorage.length;
        }
        catch {
            return 0;
        }
    }
    clear() {
        try {
            localStorage.clear();
        }
        catch { }
    }
    getItem(key: string) {
        try {
            return localStorage.getItem(key);
        }
        catch {
            return null;
        }
    }
    key(index: number) {
        try {
            return localStorage.key(index);
        }
        catch {
            return null;
        }
    }
    removeItem(key: string) {
        try {
            localStorage.removeItem(key);
        }
        catch { }
    }
    setItem(key: string, value: any) {
        try {
            localStorage.setItem(key, value);
        }
        catch { }
    }
}