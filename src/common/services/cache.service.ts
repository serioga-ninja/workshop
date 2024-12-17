import { singleton } from 'tsyringe';
import RedisConnection from '../../libs/redis';

@singleton()
export default class CacheService {
  constructor(
    private readonly _redisConnection: RedisConnection,
  ) {
  }

  set(key: string, value: string) {
    return this._redisConnection.client.set(key, value);
  }

  get(key: string) {
    return this._redisConnection.client.get(key);
  }

  async setJSON(key: string, value: Record<string, any>, expire: number) {
    await this._redisConnection.client.json.set(key, '$', value);
    await this._redisConnection.client.expire(key, expire);
  }

  async getJSON<T>(key: string): Promise<T> {
    return await this._redisConnection.client.json.get(key) as T;
  }
}
