import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // create instance of a ticket
  const ticket = Ticket.build({
    title: "NBA",
    price: 5,
    userId: "asdf",
  });

  // save the ticket ot the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // save the first fetched ticket
  await firstInstance!.save();

  // save the second fetched ticket and expect an error
  expect.assertions(1); // expect to get into the catch
  try {
    await secondInstance!.save();
  } catch (err) {
    expect(err).toBeDefined();
  }
  // await expect(secondInstance!.save()).rejects.toThrow();
});

it("increments the version number in multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 100,
    userId: "asdf",
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
