import { isTauri } from "@tauri-apps/api/core";
import { createFeatureStorage } from "../infraestructure/storage/features/feachureStorageFactory";
import { UpdateRate } from "../use_cases/update_rate";
import { GetRate } from "../use_cases/get_rate";

export const APPLICATION_MODE = isTauri() ? "desktop" : "web"

const feachureStorage = createFeatureStorage(APPLICATION_MODE)

export const updateRate = new UpdateRate(feachureStorage)
export const getRate = new GetRate(feachureStorage)