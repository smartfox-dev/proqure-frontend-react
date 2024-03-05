import { Configuration, OpenAIApi } from "openai";

export const davinci = async (prompt, key) => {
  try {
    const configuration = new Configuration({
      apiKey: key,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `${prompt}?` },
        ],
        temperature: 0.1,
        max_tokens: 512,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
      },
      { responseType: "stream" }
    );

    const stream = response.data;
    let data = "";
    stream
      .toString()
      .split("\n")
      .forEach((line) => {
        if (line.trim() !== "") {
          const message = line.replace(/^data: /, "");
          if (
            message === "[DONE]" ||
            JSON.parse(message).choices[0].finish_reason === "stop"
          )
            return;
          let token;
          token = JSON.parse(message).choices[0].delta.content;
          data += token;
        }
      });
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle or report the error as needed
  }
};