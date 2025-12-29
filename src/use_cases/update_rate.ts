import type { FeatureStorage } from "../infraestructure/storage/features/features_sotrage.interface";

export class UpdateRate {
    constructor(private storage: FeatureStorage){}
    
    async execute(ratePerHour: number) {
        await this.storage.save('ratePerHour', ratePerHour)
    }
}