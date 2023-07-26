import Pusher from "pusher";

const pusherHandler = new Pusher({
  appId: process.env.app_id!,
  key: process.env.key!,
  secret: process.env.secret!,
  cluster: process.env.cluster!,
  useTLS: true,
});

export default pusherHandler;
