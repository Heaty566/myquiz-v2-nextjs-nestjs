import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

export class CusRepository<T> extends Repository<T> {
        public async findOneByField(field: keyof T, value: any) {
                if (field === '_id' && typeof value === 'string') {
                        return await this.findOne({ [field]: new ObjectId(value) });
                }

                return await this.findOne({ [`${field}`]: value });
        }
}
