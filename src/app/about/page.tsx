import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const Page = () => {
  return (
    <>
      <section>
        <div className="py-12">
          <h1 className="text-primary font-mono text-3xl text-center">
            Discover. Connect. Play
          </h1>
          <p className="mt-8 text-center text-muted-foreground max-w-2xl mx-auto text-sm px-4">
            Basketball is more than just a game, it&apos;s a community. This
            platform helps players, coaches, trainers, and organizers find and
            share events with ease, bringing the basketball world closer
            together
          </p>
        </div>

        <article className="py-12 bg-muted px-4">
          <h2 className="text-2xl font-mono font-medium text-primary text-center">
            About the platform
          </h2>
          <p className="max-w-2xl mx-auto mt-8">
            Finding and promoting basketball events should be simple — and
            that&apos;s exactly what this platform is built for. Here, athletes,
            coaches, trainers, and event organizers can discover tournaments,
            camps, matchups, and training sessions, or share their own events
            with the community. Think of it as your public basketball event
            board: easy to browse, free to post, and built to connect people who
            love the game. Whether you&apos;re looking for your next matchup or
            getting the word out about an upcoming event, we&apos;re here to
            help you make it happen.
          </p>
        </article>
        <article className="py-12 px-4">
          <h2 className="text-2xl font-mono font-medium text-primary text-center">
            Who is it for
          </h2>
          <p className="max-w-2xl mx-auto mt-8">
            Whether you&apos;re an athlete looking for your next tournament, a
            coach organizing team matchups, a trainer offering private sessions,
            or an event organizer planning a big showcase — you&apos;ll find
            your place here. Anyone can explore the platform freely to discover
            events nearby or across regions. And if you&apos;re ready to post
            your own events, signing up is quick and easy — create a free
            account with your email or Google account and start sharing your
            events with the basketball community today.
          </p>
        </article>
        <article className="pt-12 pb-24 px-4 bg-muted">
          <h2 className="text-2xl font-mono font-medium text-primary text-center">
            How to use it
          </h2>
          <p className="max-w-2xl mx-auto mt-8">
            Getting started is simple. Navigate to the &apos;Events&apos; tab
            and start browsing events easily through our searchable list, use
            filters and sorting options to help you find exactly what fits your
            needs. Use the toggle buttons to switch from a grid to a table view.
            Want a broader look? Check out the calendar to see what&apos;s
            coming up, or explore the map to find events near you. <br />
            Want to post your own events? Just create a free account, fill out a
            quick form with your event details, and share your event. This
            platform is here to make it easy for players, coaches, trainers, and
            organizers to connect and keep the game going.
          </p>
        </article>
      </section>
    </>
  );
};

export default Page;
