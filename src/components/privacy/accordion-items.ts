import { AccordionItem } from "./privacy-accordion";

export const infoCollectionList: AccordionItem[] = [
  {
    value: "info-collect-1",
    trigger: "What kind of data is collected?",
    content: `
        1. Account information.\n
        When you sign up, we collect your email address. You can sign up using either:
        ● Email and password - passwords are securely hashed and stored. We cannot view or retrieve your password.
        ● Google Sign-In - if you use Google to authenticate, we receive limited profile information from Google (such as your email). We do not share any data back with Google.\n
        2. User-Generated content
        You can upload sports events, including details like the date, location, and images. These events become public and can be seen by anyone visiting the site.\n
        3. Authentication cookies
        We use cookies only to manage your authentication session (to keep you logged in). We do not use cookies for tracking or advertising.
    `,
  },
  {
    value: "info-collect-2",
    trigger: "How do we collect data?",
    content: `
        We only collect information that you choose to provide. This includes things like:
        ● Events you create
        ● Images you upload
        ● Your email address (when signing up)\n
        You can delete any of this information at any time.
    `,
  },
  {
    value: "info-collect-3",
    trigger: "What do we do with this data?",
    content: `
        We use your information to:
        ● Allow you to log in and manage your account
        ● Display the events you create on the public site
        ● Enable features like uploading images, deleting and updating your events.\n
        We do not:
        ● Use your data for advertising
        ● Track your behavior or collect device information
        ● Share your data with third parties
    `,
  },
];

export const infoCookiesList: AccordionItem[] = [
  {
    value: "info-cookies-1",
    trigger: "What are cookies?",
    content: `
        Cookies are small text files stored in your browser that help websites remember information between visits. 
        They are commonly used for things like keeping you logged in or remembering preferences.
    `,
  },
  {
    value: "info-cookies-2",
    trigger: "How do we use cookies?",
    content: `
        We only use cookies to manage your login session. This allows us to keep you authenticated as you navigate the site. 
        We do not use cookies for tracking, advertising, or analytics.
    `,
  },
];

export const infoSharingList: AccordionItem[] = [
  {
    value: "info-sharing-1",
    trigger: "Third-Party services",
    content: `
        We use the following external services to improve functionality and security:
        ● Google Maps & Places API: To show maps and assist with location details
        ● Google Safe Browsing: To verify the safety of submitted URLs
        ● Google Authentication: To enable sign-in via Google account
        ● HCaptcha: To prevent spam and abuse
        ● SendGrind: To send transactional emails (e. g., for account verification and password reset)
        These services may collect limited data necessary for their operation. Please review their respective privacy policies for more information.\n
        We do not use any analytics or profiling tools. We do not collect data about your device, preferences or browsing behavior.
    `,
  },
  {
    value: "info-sharing-2",
    trigger: "Legal compliance",
    content: `
        We aim to follow data protection best practices in line with regulations like the GDPR and CCPA. 
        We do not sell or share your data with third parties, and we give you full control over your account and content.
    `,
  },
];

export const infoRightsList: AccordionItem[] = [
  {
    value: "info-rights-1",
    trigger: "Access and control",
    content: `
          Your email address is never publicly visible and is not associated with your events on the public site. 
          However, when creating an event, you have the option to include your own contact information if you'd like others to reach you.
          You have full control over your data:
          ● Edit any event you created.
          ● Delete any images you uploaded, and it will be immediately removed from our database and public site.
          ● Delete any event you have created, and it will be immediately removed from our database and public site.
          ● Delete your account, and any events created from your account will be removed from our database and public site.
      `,
  },
  {
    value: "info-rights-2",
    trigger: "Opt-Out options",
    content: `
        Creating an account is completely optional. You can browse and view all public events on the site without signing up.\n
        An account is only required if you want to create or manage your own events.
        If you do choose to sign up, you can delete your account—and all events or images you've uploaded—at any time. Once deleted, your data is permanently removed from our systems.
    `,
  },
];
