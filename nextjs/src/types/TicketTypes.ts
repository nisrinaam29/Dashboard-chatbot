// yang di pake firebase
// export interface MessageTypes {
//     message: string;
//     role: 'user' | 'agent';
//     updated_at: string;
//   }
//   export interface TicketTypes {
//     messages: Record<string, MessageTypes>;
//     phone_number: string;
//     request_submitted: string;
//     status: string;
//     ticket_code: string;
//     category:string;
//   }
  
//   export type TicketData = Record<string, TicketTypes>;
  
export type TicketTypes = {
  id : string;
  category: string;
  phone_number: string;
  request_submitted : Date;
  status : string;
  ticket_code: string;
  ro: string
}

export type MessageTypes ={
  id:  string;
  ticket_id  : string;
  message : string;
  role : string;
  updated_at : string;
}