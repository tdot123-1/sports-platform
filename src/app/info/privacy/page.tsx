const Page = () => {
  return (
    <section className="px-4">
      <h1 className="text-2xl font-mono text-primary mt-4">Privacy</h1>
      <p className="text-sm my-6">
        [introduce purpose of page] Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Temporibus molestiae aliquam nisi tempore repellat
        natus exercitationem debitis necessitatibus mollitia recusandae impedit.
      </p>
      <article className="my-6">
        <h2 className="text-xl font-mono text-primary">
          Information collection
        </h2>
        <ul>
          <li>Which data is collected?</li>
          <li>How is the data collected?</li>
          <li>What do we do with this data?</li>
        </ul>
      </article>
      <article className="my-6">
        <h2 className="text-xl font-mono text-primary">Cookies</h2>
        <ul>
          <li>What are cookies?</li>
          <li>How are cookies used?</li>
          <li>Manage your cookies</li>
        </ul>
      </article>
      <article className="my-6">
        <h2 className="text-xl font-mono text-primary">Data sharing</h2>
        <ul>
          <li>Third party services</li>
          <li>Legal compliance</li>
        </ul>
      </article>
      <article className="my-6">
        <h2 className="text-xl font-mono text-primary">User rights</h2>
        <ul>
          <li>Access and control</li>
          <li>Opt-Out options</li>
        </ul>
      </article>
    </section>
  );
};

export default Page;
