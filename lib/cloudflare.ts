import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

async function upload(name: string, file: Buffer, type: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_S3_BUCKET,
    Key: name,
    Body: file,
    ContentType: type,
  });
  const response = await S3.send(command);
  return response;
}

export async function imageUploader(
  productId: string,
  files: Map<string, string | number | Buffer>[]
) {
  try {
    const promises: Promise<PutObjectCommandOutput>[] = [];
    const imageUrls: string[] = [];
    files.forEach((file) => {
      const map = new Map(file);
      const type = map.get("type") as string;
      const buffer = map.get("file") as Buffer;
      const name = `${productId}_${Date.now()}.${type.split("/")[1]}`;
      promises.push(upload(name, buffer, type));
      imageUrls.push(`${process.env.CLOUDFLARE_PUBLIC_URL}/${name}`);
    });
    await Promise.all(promises);
    return imageUrls;
  } catch (error) {
    throw error;
  }
}
