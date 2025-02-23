'use server'
import jwt from 'jsonwebtoken'

import bcrypt from "bcrypt";

import generalResponse from '@/libs/generalResponse'
import type { UserTypes } from '@/types/UserTypes'
import User from '@/libs/models/User'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const existUser: any = await User.findOne({
      where: {
        email: email,
      }
    })
    if (!email){
      return generalResponse(400, false, "Anda belum memasukan email!");

    }
    if (!existUser) {
      return generalResponse(400, false, "Data akun tidak di temukan");
    }

    const match = await bcrypt.compare(password, existUser.toJSON().password as string)

    if (!password) {
      return generalResponse(400, false, "Anda belum memasukan password")
    }
    if (!match) {
      return generalResponse(400, false, "Password yang anda masukkan salah")
    }

    const responseData: UserTypes = {...existUser.toJSON()}

    const token = jwt.sign({...responseData}, process.env.JWT_SECRET_KEY || 'TEST', {
      expiresIn: '24h'
    })
    
    await User.update(
      { status: '1' }, // Assuming `status` is the field you want to update
      { where: { email: email } }
    );
    return generalResponse(200, true, "Anda berhasil masuk", {"token": token})
  } catch (error: any) {
    return generalResponse(500, false, error.message || 'Internal Server Error')
  }
}
