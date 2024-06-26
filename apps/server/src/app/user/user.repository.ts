import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';

import { User, UserDocument } from '@web-url-shortener/domain';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async getUserById(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id });
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async checkUserExistsByEmail(
    email: string
  ): Promise<Pick<UserDocument, '_id'>> {
    return this.userModel.exists({ email });
  }

  async createUser(
    email: string,
    hashedPassword: string
  ): Promise<UserDocument> {
    return this.userModel.create({ email, password: hashedPassword });
  }

  async verifyUser(email: string): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ email }, { $set: { isVerified: true } });
  }

  async updatePassword(
    email: string,
    passwordHash: string
  ): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ email, password: passwordHash });
  }
}
