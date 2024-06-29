import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Announcements | BDIX Live Stream',
  description:
    'Stay updated with announcements from our administrators on live cricket, football, and entertainment channels. Get the latest news, updates, and important information directly from our team. Join our community to stay informed and engaged with our platform.',
};

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl md:text-4xl mb-4">
        Welcome to Our Live Stream Sharing Community!
      </h1>

      <p>
        I am excited to invite you to join my brand-new platform, a place where
        we all can share any live stream content we’re passionate about. Whether
        you’re into gaming, live events, educational sessions, or any other type
        of content, this is your space to connect with others and share your
        streams.
      </p>

      <h2 className="font-medium text-xl md:text-2xl mt-4">
        Our Community Values:
      </h2>
      <ul className="flex flex-col gap-4">
        <li>
          <b>Freedom to Share</b>: This platform is built for you. Share any
          live stream content you want and let your creativity shine. Together,
          we can build a diverse and vibrant community.
        </li>
        <li>
          <b>Responsibility and Respect</b>: While this platform is for
          everyone, we all share the responsibility of maintaining a respectful
          and lawful environment. If any content violates the rights of others,
          report it, and I&apos;ll try to address it as soon as possible.
        </li>
        <li>
          <b>Your Voice Matters</b>: This is your community. If you come across
          content that doesn’t align with our values or violates someone’s
          rights, report it. Your feedback helps keep our platform safe and
          enjoyable for everyone.
        </li>
      </ul>

      <p>
        Thank you for being a part of this incredible journey. I can’t wait to
        see the amazing live streams you’ll share. Let’s create, connect, and
        celebrate together!
      </p>

      <p className="mt-4">
        Happy Streaming! <br />{' '}
        <a
          href="mailto:rayhanshafi7@gmail.com"
          className="text-red-400 font-medium text-lg hover:underline"
        >
          Shafi Rayhan
        </a>
      </p>
    </div>
  );
};

export default Page;
