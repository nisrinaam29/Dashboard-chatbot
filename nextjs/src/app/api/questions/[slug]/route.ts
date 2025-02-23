import generalResponse from "@/libs/generalResponse"
import Questions from "@/libs/models/Question"

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug

    await Questions.destroy({
      where: {
        id: slug
      }
    })

    return generalResponse(200, true, 'Berhasil menghapus pertanyaan', {})
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
    const { text, answer, category_id } = await req.json()
    if (!text)
      return generalResponse(404, false, 'Teks pertanyaan tidak boleh kosong')
    if (!answer)
      return generalResponse(404, false, 'Jawaban dari pertanyaan tidak boleh kosong')
    if (!category_id)
      return generalResponse(404, false, 'Kategori pertanyaan tidak boleh kosong')
    await Questions.update(
      { text: text, answer: answer, category_id: category_id },
      {
        where: {
          id: slug,
        },
      })

    return generalResponse(200, true, 'Berhasil mengedit pertanyaan', {})
  } catch(error) {
    return generalResponse(500, false, error?.message || 'Internal Server Error')
  }

}
