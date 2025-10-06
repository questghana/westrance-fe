import { Box } from '@/components/ui/box'
import { Stack } from '@/components/ui/stack'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import Companydetail from './companydetail'
import Locationdetail from './locationdetail'
import Passwordsecurity from './passwordsecurity'
import Notificationsetting from './notificationsetting'
import AdminPasswordsecurity from './adminpassword'

type tabsProps = {
    showtabs: boolean;
}
const Setting: React.FC<tabsProps> = ({ showtabs }) => {
    const [activeTab, setActiveTab] = useState("Company Details");

    return (
        <Stack className='bg-white px-5 py-3 rounded-2xl'>
            {activeTab === "Notification Setting" ?
                <Stack className='mt-2'>
                    <p className='font-semibold'>Notification Settings</p>
                    <Box className='bg-[#F6FAFF] rounded-md lg:w-[400px] md:w-[600px] px-3 py-4'>
                        <p>Manage how you'd like to receive alerts and updates.</p>
                    </Box>
                </Stack>
                :
                <Stack className='mt-2'>
                    <p className='font-semibold'>Settings</p>
                    <Box className='bg-[#F6FAFF] rounded-md lg:w-[600px] md:w-[600px] px-3 py-4'>
                        <p>Manage your account preferences, update credentials, and control notification settings</p>
                    </Box>
                </Stack>}
            <Tabs className={`${showtabs ? "mt-4" : "mt-10"} w-full`} defaultValue={showtabs ? 'Company Details' : 'Password & Security'} onValueChange={setActiveTab}>
                <TabsList className={`bg-[#ebf2fd] w-full ${showtabs ? "lg:w-[800px]" : "lg:w-[450px]"} h-full flex flex-wrap justify-center gap-2 px-2`}>
                    {showtabs &&
                        <>
                            <TabsTrigger value="Company Details" className="md:px-6 px-3 py-2 text-sm md:text-base">
                                Company Details
                            </TabsTrigger>
                            <TabsTrigger value="Location Details" className="md:px-6 px-3 py-2 text-sm md:text-base">
                                Location Details
                            </TabsTrigger>
                        </>
                    }
                    <TabsTrigger value="Password & Security" className="md:px-6 px-3 py-2 text-sm md:text-base">
                        Password & Security
                    </TabsTrigger>
                    <TabsTrigger value="Notification Setting" className="md:px-6 px-3 py-2 text-sm md:text-base">
                        Notification Setting
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="Company Details">
                    <Companydetail />
                </TabsContent>
                <TabsContent value="Location Details">
                    <Locationdetail />
                </TabsContent>
                <TabsContent value="Password & Security">
                    {showtabs ? <Passwordsecurity /> : <AdminPasswordsecurity />}
                </TabsContent>
                <TabsContent value="Notification Setting">
                    <Notificationsetting variant={showtabs ? "company-dashboard" : "dashboard"} />
                </TabsContent>
            </Tabs>

        </Stack>
    )
}

export default Setting