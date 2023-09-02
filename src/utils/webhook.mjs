import request from "minimal-request";

export const triggerWebhook = (url, data) => {
  request(
    {
      url: url,
      method: "post",
      body: data,
      json: true,
      timeout: 5,
    },
    function (err, res, details) {
      if (details.statusCode === 200) return true;
    }
  );
};
