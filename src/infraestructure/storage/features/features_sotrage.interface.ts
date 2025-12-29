export interface FeatureStorage {
  save(key: string, value: any): Promise<void>
  load<T>(key: string): Promise<T | null>
}