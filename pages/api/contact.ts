import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  const text = `*Nuevo mensaje de contacto*\nNombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`;

  try {
    console.log('TOKEN:', telegramBotToken);
    console.log('CHAT ID:', telegramChatId);
    const response = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${encodeURIComponent(text)}`
    );


    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Telegram] API response:', errorData);
      throw new Error('Telegram API error');
    }

    return res.status(200).json({ message: 'Mensaje enviado por Telegram correctamente' });
  } catch (error) {
    console.error('[Telegram] Error:', error);
    return res.status(500).json({ message: 'Error al enviar el mensaje por Telegram' });
  }
}
