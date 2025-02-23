export type UserTypes = {
  id: number,
  email: string,
  password: string,
  name: string,
  phone_number:string,
  status: string,
  ro: string,
  category_id:string
}
export type UserWaTypes = {
  id: number,
category_id:number,
  phone_number:string,
  status: string
}

export type LoginData = {
email:string,
password:string
}

export type ResetPassword = {
  newPassword:string,
  confirmPassword:string
}

export type UpdateData = {
email:string,
name:string,
phone_number:string
}

