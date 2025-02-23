import { promises as fs } from 'fs'
import path from 'path'

import generalResponse from '@/libs/generalResponse'

export async function GET(req: Request, { params }: { params: { slug: string[] } }) {
  if (params.slug && params.slug.length) {
    const publicDir = __dirname.split('.next')[0] + 'public/'
    const fileUrl = params.slug.join('/')
    const filePath = path.join(publicDir, fileUrl)

    try {
      const data = await fs.readFile(filePath)

      const extname = path.extname(filePath).toLowerCase()
      let contentType = 'application/octet-stream'

      switch (extname) {
        case '.pdf':
          contentType = 'application/pdf'
          break
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg'
          break
        case '.png':
          contentType = 'image/png'
          break
        case '.gif':
          contentType = 'image/gif'
          break
        default:
          contentType = 'application/octet-stream'
          break
      }

      return new Response(data, { headers: { 'Content-Type': contentType } })
    } catch (error) {
      return generalResponse(400, false, error.message, null)
    }
  } else {
    return generalResponse(400, false, 'gagal', null)
  }
}
