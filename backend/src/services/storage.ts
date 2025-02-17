/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import AWS from 'aws-sdk';

const ENDPOINT_S3 = process.env.ENDPOINT_S3 ?? "";
const KEY_ID = process.env.KEY_ID ?? "";
const APP_KEY = process.env.APP_KEY ?? "";
const KEY_NAME = process.env.KEY_NAME ?? "";

const endpoint = new AWS.Endpoint(ENDPOINT_S3);

const s3 = new AWS.S3({
  endpoint,
  credentials: {
    accessKeyId: KEY_ID,
    secretAccessKey: APP_KEY,
  },
});

type UploadResponse = {
  url: string;
  path: string;
};

export const uploadImagem = async (
  path: string,
  buffer: Buffer,
  mimetype: string
): Promise<UploadResponse> => {
  const produtoImagem = await s3
    .upload({
      Bucket: KEY_NAME,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return {
    url: `https://${KEY_NAME}.${ENDPOINT_S3}/${produtoImagem.Key}`,
    path: produtoImagem.Key,
  };
};

export const excluirImagem = async (path: string): Promise<void> => {
  await s3
    .deleteObject({
      Bucket: KEY_NAME,
      Key: path,
    })
    .promise();
};

export const buscarImagem = async (path: string): Promise<UploadResponse[]> => {
  const arquivo = await s3.listObjectsV2({
    Bucket: KEY_NAME,
    Prefix: path,
  }).promise();

  const files = arquivo.Contents?.map((file) => {
    if (file.Key) {
      return {
        url: `https://${KEY_NAME}.${ENDPOINT_S3}/${file.Key}`,
        path: file.Key
      };
    }
    return null;
  }).filter((file): file is UploadResponse => file !== null) ?? [];

  return files;
};
