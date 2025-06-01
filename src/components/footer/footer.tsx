import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-sidebar text-sidebar-foreground p-8 text-center">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
        <div className="w-full sm:w-3/5  md:w-2/5">
          <div className="w-52 m-4 mx-auto">
            <Image
              src={"/logo-compressed.png"}
              alt="Hi-Fives logo"
              width={13024}
              height={5171}
            />
          </div>
          <p className="text-sm">
            Where Basketball Happens. <br />
            The number one hub for tournaments, training, and more.
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          <li>© 2025 Hi-Fives. All Rights Reserved.</li>
          <li className="underline underline-offset-2">
            <Link href={"/info/privacy"}>Privacy policy</Link>
          </li>
          <li>Contact us: info@hi-fives.com</li>
        </ul>
      </div>

      <p className="text-xs italic mt-8">
        Disclaimer: The information and services provided on this platform are
        for general purposes only and do not constitute professional advice or
        guarantees of performance. While we strive to ensure the accuracy and
        reliability of our content, we are not responsible for any errors,
        omissions or outcomes resulting from the use of this site. Use of this
        platform is at your own risk.
      </p>
    </footer>
  );
};

export default Footer;
