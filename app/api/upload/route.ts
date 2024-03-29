import { NextResponse } from 'next/server';
import { File } from 'buffer';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import mime from 'mime-types';

const bucketName = 'pavlo-next-ecommerce'

export async function POST(req: Request) {
    const formData = await req.formData()

    const file = formData.get('file') as Blob | null
    const ext = file?.name.split('.').pop()
    const newFileName = Date.now() + '.' + ext

    if (!file) return NextResponse.json({ message: 'fail' })

    const isFile = file instanceof File
    if (!isFile) return NextResponse.json({ message: 'fail' })

    const buffer = await file.arrayBuffer()

    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY!,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
        },
    })

    const contentType = mime.lookup(newFileName);
    client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: Buffer.from(buffer),
        ACL: 'public-read',
        ContentType: contentType !== false ? contentType : undefined,
    }))

    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`

    return NextResponse.json({ link })
}
