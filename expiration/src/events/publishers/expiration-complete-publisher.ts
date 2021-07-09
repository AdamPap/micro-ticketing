import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@adamptickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
