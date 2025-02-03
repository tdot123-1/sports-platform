import { createClient } from "@/lib/supabase/server";

import SidebarLinks from "./sidebar-links";

const AppSidebarContent = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <>
      {data.user ? (
        <>
          <SidebarLinks authenticated />
        </>
      ) : (
        <SidebarLinks authenticated={false} />
      )}
    </>
  );
};

export default AppSidebarContent;
