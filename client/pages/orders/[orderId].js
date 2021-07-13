// import useRequest from "../../hooks/use-request";

const OrderShow = ({ order }) => {
  // const { doRequest, errors} = useRequest({
  //   url: '/api/orders',
  //   method: 'get',
  //   body: {
  //     orderId: order.id
  //   },
  //   onSuccess:(order => console.log(order))
  // })

  return (
    <div>
      <h1>Order expires at: {order.expiresAt}</h1>
      <h2>Order status: {order.status}</h2>
      <h2>Ticket: {order.ticket.title}</h2>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
