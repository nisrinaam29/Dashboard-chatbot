import { NextRequest, NextResponse } from 'next/server';
import Ticket from '@/libs/models/Ticket';
import generalResponse from '@/libs/generalResponse';


export async function PUT(req: NextRequest, { params }: { params: {statusactive} }) {
    try {
        const {statusactive:ticketId} = params;
        if (!ticketId) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: 'Key is required'
            });
        }

        // Update the status to 'active'
        await Ticket.update(
            { status: 'active' },
            { where: { id: ticketId } }
        );

        return generalResponse(
            200, true, 'Status updated to active successfully!'
        );
    } catch (error) {
        return generalResponse(
            500,
            false,
            error?.message || 'Internal Server Error')
    };
}

