import type { FeatureStorage } from "../infraestructure/storage/features/features_sotrage.interface";

export class GetRate {
    constructor (private storage:FeatureStorage){}

    async execute() {
        const rate = await this.storage.load<number>('ratePerHour') 
        
        return rate == null? 0 : rate 
    }
}