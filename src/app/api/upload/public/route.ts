import { UploadService } from '@/server/libraries/upload'
import { NextRequest, NextResponse } from 'next/server'
import { zfd } from 'zod-form-data'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const uploadFileSchema = zfd.formData({
      file: zfd.file(),
    })

    const formData = await request.formData()
    const parsedData = uploadFileSchema.parse({
      file: formData.get('file'),
    })
    const urls = await UploadService.uploadPublic(parsedData.file)
    return NextResponse.json(urls?.[0])
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
