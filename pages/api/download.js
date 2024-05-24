import axios from 'axios';

export default async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const data = Buffer.from(response.data, 'binary');

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'attachment; filename=image.jpg');
    res.send(data);
  } catch (error) {
    res.status(500).send('Error downloading image');
  }
};
