import { Model, Document, Types } from 'mongoose';

interface IBaseService<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  find(query?: object): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
  exists(query: object): Promise<boolean>;  // New method to check existence
}

class BaseService<T extends Document> implements IBaseService<T> {
  constructor(private model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(new Types.ObjectId(id));
  }

  async find(query: object = {}): Promise<T[]> {
    return this.model.find(query);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(new Types.ObjectId(id), data, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(new Types.ObjectId(id));
  }

  // New method to check if a record exists based on a query
  async exists(query: object): Promise<boolean> {
    return this.model.exists(query).then((result) => result !== null);
  }
}

export default BaseService;
