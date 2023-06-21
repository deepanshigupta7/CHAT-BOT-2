async function fetchMessages() {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      context: responses.slice(-3),
      emotion: "joy",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "http://192.168.29.11:8080/cakechat_api/v1/actions/get_response",
      requestOptions
    );
    const result = await response.text();
    return result;
  } catch (err) {
    return err;
    // console.log("error", error);
  }
}

async function getBotResponse(input) {
  const res = await fetchMessages();
  const responseMessage = JSON.parse(res).response;
  responses.push(responseMessage);
  return responseMessage;
}
