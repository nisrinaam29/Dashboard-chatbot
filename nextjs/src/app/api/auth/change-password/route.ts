'use server'

import 'server-only'
import type { NextRequest } from 'next/server'

import * as bcrypt from 'bcrypt'

import { jwtDecode } from 'jwt-decode'

import generalResponse from '@/libs/generalResponse'
import User from '@/libs/models/User'
import type { UserTypes } from '@/types/UserTypes'

export async function PUT(req: NextRequest) {
  const { newPassword, confirmPassword } = await req.json()

  if (newPassword == null) {
    return generalResponse(400, false, 'New Password tidak boleh kosong')
  }

  if (confirmPassword == null) {
    return generalResponse(400, false, 'Confirm Password tidak boleh kosong')
  }

  if (newPassword !== confirmPassword) {
    return generalResponse(400, false, 'New Password dan konfirmasi password tidak cocok')
  }

  const token = req.headers.get('authorization') || ''
  const decoded: UserTypes = jwtDecode(token)

  try {
    let new_hashed_password

    new_hashed_password = await bcrypt.hash(newPassword, 10)

    const user: any = await User.findOne({
      where: {
        id: decoded.id
      }
    })

    if (!user) {
      return generalResponse(400, false, 'Email not found')
    }

    if (new_hashed_password == user.password) {
      return generalResponse(400, false, 'Password sama dengan yang sebelumnya!')
    }

    await user.update({
      password: new_hashed_password
    })

    return generalResponse(200, true, 'Password Behasil di Ganti')
  } catch (error) {
    return generalResponse(500, false, 'Error updating password!')
  }
}
