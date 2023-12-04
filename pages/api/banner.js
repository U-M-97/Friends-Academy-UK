import Banner from "../../models/banner";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { tag, description, checked } = req.body;
    try {
      const update = await Banner.updateOne(
        {},
        {
          tag: tag,
          description: description,
          checked: checked,
        },
      );

      const banner = await Banner.findOne();
      if (banner.checked == false) {
        res.send("Banner Switched Off");
      } else {
        res.send("Banner is LIVE");
      }
    } catch (err) {
      res.send(err);
    }
  } else if (req.method === "GET") {
    const banner = await Banner.findOne();
    res.send(banner);
  }
}
