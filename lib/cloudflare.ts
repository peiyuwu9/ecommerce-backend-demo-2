import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_URL,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

export async function upload(productId: string, file: File) {
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_S3_BUCKET,
    Key: `${productId}.png`,
    Body: file,
  });

  try {
    const response = await S3.send(command);
    console.log(response);
    return `${process.env.CLOUDFLARE_S3_BUCKET}/${productId}.png`;
  } catch (error) {
    throw error;
  }
}
