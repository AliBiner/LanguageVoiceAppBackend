import { Handler } from "serverless-http";
import { HandlerEvent, HandlerContext } from "@netlify/functions";
import CustomResponse from "../../src/utils/responses";

const meHandler: Handler = async (event: any, context: any) => {
  return new Response("test");
};

export default meHandler;
