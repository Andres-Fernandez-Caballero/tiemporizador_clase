import { DesktopStorage } from "./desktopStorage";
import type { FeatureStorage } from "./features_sotrage.interface"
import { WebStorage } from "./webStorage";


export const createFeatureStorage = (mode: string): FeatureStorage => 
{
    switch(mode) {
            case 'web':
                return new WebStorage()
            case 'desktop':
                return new DesktopStorage()
            default:
                throw new Error('modo NO Definido')
        }
}
 