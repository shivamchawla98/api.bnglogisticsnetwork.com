import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private readonly bucket = process.env.AWS_S3_BUCKET;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async createPresignedUrl(key: string, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: `company-logos/${key}`,
      ContentType: contentType,
    });

    try {
      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });
      return signedUrl;
    } catch (error) {
      throw new Error(`Failed to generate pre-signed URL: ${error.message}`);
    }
  }
}
