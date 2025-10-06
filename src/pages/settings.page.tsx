// import { PasswordSecuritySettings } from "@/components/settings/passwordsecuritysettings";
// import { DelectAccountSettings } from "@/components/settings/delectaccountsettings";
// import { NotificationSettings } from "@/components/settings/notificationsettings";
// import { TwoFactorSettings } from "@/components/settings/twofactorsettings";
// import { ProfilePhoto } from "@/components/settings/profilephotosettings";
// import { ComponentWrapper } from "@/components/common/componentwrapper";
// import { Stack } from "@/components/ui/stack";
import Setting from "@/components/support/setting/setting";
import { Box } from "@/components/ui/box";

export const SettingsPage = () => {
  return (
    <Box className='pt-4'>
      <Setting showtabs={false}/>
    </Box>
  );
};
