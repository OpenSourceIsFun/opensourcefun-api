import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { OnModuleInit } from '@nestjs/common';
import mime from 'mime-types';
import { bucketName } from 'config/aws';

export class AwsService implements OnModuleInit {
  private s3: S3Client;

  public onModuleInit() {
    this.s3 = new S3Client({
      useArnRegion: true
    });
  }

  public async saveFile(fileKey: string, blob: Buffer): Promise<any> {
    try {
      return await this.s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          ContentType: mime.lookup(fileKey),
          CacheControl: 'public, max-age=31536000',
          Key: fileKey,
          Body: blob
        })
      );
    } catch (e) {
      return e;
    }
  }

  public async deleteFile(fileKey: string): Promise<any> {
    return this.s3.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileKey
      })
    );
  }
}
