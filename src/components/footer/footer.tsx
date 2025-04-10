import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-foreground text-basket p-8 text-center">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
        <div className="w-full sm:w-3/5  md:w-2/5">
          <div className="rounded-full border border-basket p-6 w-fit mx-auto mb-4">
            <h2 className="text-2xl">LOGO</h2>
          </div>
          <p className="text-sm">
            [Tagline / small about] Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint reprehenderit vel, qui delectus illum
            asperiores eius omnis odit?
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          <li>© 2025 Sports Platform. All Rights Reserved.</li>
          <li className="underline underline-offset-2">
            <Link href={"/info/privacy"}>Privacy policy</Link>
          </li>
          <li>Contact us: sports_platform@email.com</li>
        </ul>
      </div>

      <p className="text-xs italic">
        Disclaimer: Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
        officia porro veniam officiis perspiciatis mollitia dicta, illum eum.
      </p>
    </footer>
  );
};

export default Footer;
