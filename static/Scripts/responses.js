const emotionMapping = {
  Angry: "anger",
  Fear: "sadness",
  Happy: "joy",
  Sad: "sadness",
  Surprise: "neutral",
}

async function fetchMessages(emotion) {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      context: responses.slice(-3),
      emotion: emotionMapping[emotion],
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

async function getEmotion(text){
  try{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "text": text
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const response = await fetch(
      "http://192.168.29.11:3000/emotion",
      requestOptions
    );
    const result = await response.text();
    return result;

  }catch(err) {
    return err;
  }
}

async function getBotResponse(input) {
  const emotion_json = await getEmotion(input);
  const emotion = JSON.parse(emotion_json).emotion;
  const res = await fetchMessages(emotion);
  const responseMessage = JSON.parse(res).response;
  responses.push(responseMessage);
  return responseMessage;
}
