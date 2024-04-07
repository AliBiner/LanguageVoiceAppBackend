import { Handler } from "serverless-http";
import { me } from "../../src/controllers/auth_controller";
import { HandlerContext, HandlerEvent } from "@netlify/functions";

const meHandler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "denedik olmadı",
    }),
  };
};

export default meHandler;
