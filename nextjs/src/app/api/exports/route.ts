import path from 'path'

import type { NextRequest } from 'next/server'

import Excel from 'exceljs'

import { jwtDecode } from 'jwt-decode'

import Ticket from '@/libs/models/Ticket'
import User from '@/libs/models/User'
import type { UserTypes } from '@/types/UserTypes'

import generalResponse from '@/libs/generalResponse'
import RegionalOffice from '@/libs/models/RegionalOffice'

User.hasOne(RegionalOffice, {
    foreignKey: 'id',
    sourceKey: 'ro'
})

RegionalOffice.belongsTo(User, {
    foreignKey: 'id'
})

export async function GET(req: NextRequest) {
    const token = req.headers.get('authorization') || ''

    try {
        const decoded: UserTypes = jwtDecode(token)

        const user = await User.findOne({
            include: ['RegionalOffice'],
            where: { id: decoded.id }
        })

        if (!user) {
            return generalResponse(404, false, 'User not found')
        }

        const tickets = await Ticket.findAll({ where: { ro: user.ro } })

        const userRo = user.ro

        const date = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit'
        })
            .format(new Date())
            .replace(/ /g, '-')
            .replace(/,/g, '') // Replace colons with hyphens for filename safety

        const workbook = new Excel.Workbook()
        const worksheetRecapWidgets = workbook.addWorksheet(`Recap Ticket RO ${userRo}`)

        worksheetRecapWidgets.columns = [
            { key: 'id', header: 'ID Ticket' },
            { key: 'phoneNumber', header: 'No. Telp' },
            { key: 'requestSubmitted', header: 'Tanggal Tiket Masuk' },
            { key: 'status', header: 'Status Tiket Terakhir' },
            { key: 'ticketCode', header: 'Kode Ticket' },
            { key: 'category', header: 'Kategori Tiket' }
        ]

        tickets.forEach((item: any) => {
            worksheetRecapWidgets.addRow({
                id: item.id,
                phoneNumber: item.phone_number,
                requestSubmitted: item.request_submitted,
                status: item.status,
                ticketCode: item.ticket_code,
                category: item.category
            })
        })

        // Define the path to save the file in the public directory
        const fileName = `Generate_${user?.RegionalOffice?.ro}_${date}.xlsx`
        const exportPath = path.join(process.cwd(), 'public', fileName)

        await workbook.xlsx.writeFile(exportPath)

        // Construct the URL to access the file
        const fileUrl = `/api/public/${fileName}`

        return generalResponse(200, true, 'File generated successfully', fileUrl)
    } catch (error) {
        console.error('Error generating the Excel file:', error)

        return generalResponse(500, false, 'Internal Server Error')
    }
}
