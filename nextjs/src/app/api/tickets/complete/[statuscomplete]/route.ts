import { NextRequest, NextResponse } from 'next/server';
import Ticket from '@/libs/models/Ticket';
import generalResponse from '@/libs/generalResponse';


export async function PUT(req: NextRequest, { params }: { params: {statuscomplete} }) {
    try {
        const {statuscomplete:ticketId} = params
        if (!ticketId) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: 'Key is required'
            });
        }

        await Ticket.update(
            { status: 'complete' },
            { where: { id: ticketId } }
        );

        return generalResponse(
            200, true, 'Status updated to complete successfully!'
        );
    } catch (error) {
        return generalResponse(
            500,
            false,
            error?.message || 'Internal Server Error')
    };
}

