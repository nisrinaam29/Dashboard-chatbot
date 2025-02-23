import { jwtDecode } from 'jwt-decode'
import generalResponse from '@/libs/generalResponse'
import type { UserTypes } from '@/types/UserTypes'
import User from '@/libs/models/User'
import * as bcrypt from "bcrypt";

export async function GET (req: Request){
    const token = req.headers.get('authorization') || ''
    const decoded: UserTypes = jwtDecode(token)
  
    try {
      const user = await User.findOne({
        where: {
          id: decoded.id
        }
      })

      return generalResponse(200, true, 'OK', user)
    } catch (error) {
        return generalResponse(500, false, error.message || 'Internal Server Error')

    }
}

export async function PUT(req: Request) {
  // Extract token from headers
  const token = req.headers.get('authorization') || '';

  // if (!token) {
  //   return generalResponse(400, false, 'Token tidak ditemukan');
  // }
  // Decode the token to get user information
  const decoded: UserTypes = jwtDecode(token);
  try {
    const {email, name, phone_number}= await req.json()
    if (!email)
      return generalResponse(400, false, 'Email akun tidak boleh kosong!')
    if (!name)
      return generalResponse(400, false, 'Nama akun tidak boleh kosong!')
    if (!phone_number)
      return generalResponse(400, false, 'Phone Number akun tidak boleh kosong!')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return generalResponse(400, false, "Mauskan format email yang benar!")

    }
  
    const phoneRegex = /^\d{10,15}$/;

    if (!phoneRegex.test(phone_number)) {
      return generalResponse(400, false, "Mauskan format Phone Number yang benar!")

    }
    const user:any = await User.findOne({
      where: {
        id:decoded.id
      }
    })

    if (!user){
      return generalResponse(400, false, "User tidak ditemukan")
    }
    

    await user.update({
      email,
      name,
      phone_number
    });

    const updatedUser = await User.findOne({
      where: {
        id: decoded.id,
      },
      attributes: ['name', 'email', 'phone_number'], // Only select specific fields
    });
    return generalResponse(200, true, 'Profile user berhasil di update', updatedUser);

  } catch (error) {
    return generalResponse(500, false, 'Gagal update profile user!');
  }
}
