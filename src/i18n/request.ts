import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import path from 'path';
import fs from 'fs/promises';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messagesRoot = path.join(process.cwd(), 'messages');

  try {
    const folders = (await fs.readdir(messagesRoot, { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    let messages: Record<string, any> = {};

    for (const folder of folders) {
      const filePath = path.join(messagesRoot, folder, `${locale}.json`);

      try {
        await fs.access(filePath);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        messages[folder] = JSON.parse(fileContent);
      } catch (error) {
        console.warn(`Idioms file not found: ${filePath}`);
      }
    }

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error("Error while loading languages:", error);
    return { locale, messages: {} };
  }
});
