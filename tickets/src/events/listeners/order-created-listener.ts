import { Message } from "node-nats-streaming";
import {
  Listener,
  NotFoundError,
  OrderCreatedEvent,
  Subjects,
} from "@adamptickets/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: data.id });
    ticket.save();

    new TicketUpdatedPublisher(this.client);

    msg.ack();
  }
}
