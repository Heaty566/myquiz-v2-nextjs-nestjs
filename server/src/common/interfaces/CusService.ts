import { ObjectId } from 'mongodb';
import { CusRepository } from './CusRepository';

export class CusService<T> {
        constructor(private readonly repository: CusRepository<T>) {}

        async getOneFindField(field: keyof T, value: any) {
                return this.repository.findOneByField(field, value);
        }
        async updateOrSave(input: T) {
                if (input[`_id`] && typeof input[`_id`] === 'string') {
                        input[`_id`] = new ObjectId(input[`_id`]);
                }

                return this.repository.save(input);
        }
}
