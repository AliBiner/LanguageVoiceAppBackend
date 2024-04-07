import {
  Handler,
  HandlerEvent,
  HandlerContext,
  HandlerResponse,
} from "@netlify/functions";

const meHandler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
): Promise<HandlerResponse> => {
  const result: HandlerResponse = {
    statusCode: 200,
  };
  return result;
};

export default meHandler;
