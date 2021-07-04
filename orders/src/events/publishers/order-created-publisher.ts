import { OrderCreatedEvent, Publisher, Subjects } from "@adamptickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
