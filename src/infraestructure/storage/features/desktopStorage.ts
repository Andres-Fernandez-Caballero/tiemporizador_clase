import { LazyStore } from "@tauri-apps/plugin-store";
import type { FeatureStorage } from "./features_sotrage.interface";

export class DesktopStorage implements FeatureStorage {
    private storage = new LazyStore('settings.data')


    save(key: string, value: any): Promise<void> {
        return this.storage.set(key, value)
    }

    load<T>(key: string): Promise<T | null> {
        return this.storage.get<T>(key).then(v => v ?? null) // casteo el undefined de la libreria a null 
    }
}