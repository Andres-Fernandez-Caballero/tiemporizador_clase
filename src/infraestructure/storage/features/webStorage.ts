import type { FeatureStorage } from "./features_sotrage.interface";

export class WebStorage implements FeatureStorage {
    save(key: string, value: any): Promise<void> {
        return  new Promise<void> (() => localStorage.setItem(key, value) ) 
    }

    load<T>(key: string): Promise<T | null> {
        return new Promise<T |null>((resolve, reject) => {
            const data = localStorage.getItem(key)
            if(data != null) resolve(data as T)
            else resolve(data)
        })
    }
}