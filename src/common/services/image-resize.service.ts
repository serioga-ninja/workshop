import type { OutputInfo } from 'sharp';
import sharp = require('sharp');
import { injectable } from 'tsyringe';

export type ResizeImageConfig = {
  width: number;
  height: number;
};

type ResizeImageOptions = {
  config: ResizeImageConfig[];
};

@injectable()
export default class ImageResizeService {
  processImage(data: Buffer, options: ResizeImageOptions): Promise<{ data: Buffer; info: OutputInfo; }[]> {
    return Promise.all(options.config.map((config) => this._resizeImage(data, config)));
  }

  private _resizeImage(data: Buffer, config: ResizeImageConfig): Promise<{ data: Buffer; info: OutputInfo; }> {
    return sharp(data)
      .resize(config.width, config.height)
      .webp()
      .toBuffer({ resolveWithObject: true });
  }
}
