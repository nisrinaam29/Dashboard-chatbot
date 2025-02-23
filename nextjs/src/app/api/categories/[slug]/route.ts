import generalResponse from "@/libs/generalResponse"
import Category from "@/libs/models/Category"

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug

    await Category.destroy({
      where: {
        id: slug
      }
    })

    return generalResponse(200, true, 'Berhasil menghapus kategori', {})
  } catch(error) {
    return generalResponse(500, false, error?.message || 'Internal Server Error')
  }

}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug
    const { text, name } = await req.json()
    if (!text)
      return generalResponse(400, false, 'teks tidak boleh kosong')
    if (!name)
      return generalResponse(400, false, 'name tidak boleh kosong')

    const allCategories = await Category.findAll()
    await Category.update(
      { text: text, name: name },
      {
        where: {
          id: slug,
        },
      })

    return generalResponse(200, true, 'Berhasil mengedit kategori', {})
  } catch(error) {
    return generalResponse(500, false, error?.message || 'Internal Server Error')
  }
}

export async function GET(
  req: Request,
  {params}: {params: {slug: string}}
) {
  try {
    const slug = params.slug

    const category = await Category.findOne({
      where: {
        id: slug
      }
    })

    return generalResponse(200, true, 'OK', category)
  } catch (error: any) {
    return generalResponse(500, false, error.message || 'Internal Server Error')
  }
}
