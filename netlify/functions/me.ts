import { Handler } from "serverless-http";

const meHandler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "denedik olmadı",
    }),
  };
};

export default meHandler;
