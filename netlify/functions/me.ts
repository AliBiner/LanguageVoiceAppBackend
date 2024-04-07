import { Handler } from "serverless-http";
import { HandlerEvent, HandlerContext } from "@netlify/functions";

const meHandler: Handler = async (event, context) => {
  return new Response(typeof event);
};

export default meHandler;
