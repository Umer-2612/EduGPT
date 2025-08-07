import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

export class S3Service {
  private s3: S3Client;
  private bucket: string;

  constructor(region: string, bucket: string) {
    this.s3 = new S3Client({ region });
    this.bucket = bucket;
  }

  async uploadFile(
    key: string,
    body: Buffer,
    contentType: string
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    await this.s3.send(command);
    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }

  async getFile(key: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const response = await this.s3.send(command);
    return response.Body as Readable;
  }
}
