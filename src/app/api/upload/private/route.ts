import { UploadService } from '@/server/libraries/upload'
import { NextRequest, NextResponse } from 'next/server'
import { zfd } from 'zod-form-data'

export async function POST(request: NextRequest, response: NextResponse) {
  const uploadFileSchema = zfd.formData({
    file: zfd.file(),
  })

  try {
    const formData = await request.formData()
    const parsedData = uploadFileSchema.parse({
      file: formData.get('file'),
    })
    const urls = await UploadService.uploadPrivate(parsedData.file)
    return NextResponse.json(urls?.[0])
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
