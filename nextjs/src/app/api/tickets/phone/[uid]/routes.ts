import { NextResponse } from 'next/server';
import generalResponse from '@/libs/generalResponse';
import Ticket from '@/libs/models/Ticket';

export async function GET(req: Request, { params }: { params: { uid: string } }) {
  try {
    const{uid: ticketId}= params; // Extract the dynamic uid value from the URL

    if (!ticketId) {
      return generalResponse(400, false, 'Ticket ID is required');
    }

    const ticket = await Ticket.findOne({
      where: { id: ticketId },
      attributes: ['phone_number'], // Fetch only the phone_number field
    });

    if (!ticket) {
      return generalResponse(404, false, 'Ticket not found');
    }

    return generalResponse(200, true, 'Phone number fetched successfully', ticket);
  } catch (error) {
    return generalResponse(500, false, error?.message || 'Internal Server Error');
  }
}
