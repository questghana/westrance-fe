import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Flex } from '@/components/ui/flex'
import { Label } from '@/components/ui/label'
import { Stack } from '@/components/ui/stack'
import { Switch } from '@/components/ui/switch'
import React from 'react'

type NotificationSettingProps = {
    variant?: "company-dashboard" | "dashboard";
};

const Notificationsetting: React.FC<NotificationSettingProps> = ({ variant }) => {
    return (
        <Box className='pt-6 '>
            <Stack className='gap-6'>
                <p className='font-semibold'>{variant === "company-dashboard" ? "Email Notifications" : "Notifications"}</p>
                <Stack>
                    <>
                    </>
                    {variant === "company-dashboard" ?
                        <>
                            <Flex>
                                <Checkbox />
                                <p>Receive important updates via email</p>
                            </Flex>
                            <Flex>
                                <Checkbox />
                                <p>Get notified when new patient are added</p>
                            </Flex>
                            <Flex>
                                <Checkbox />
                                <p>Show dashboard alerts for upcoming expiries</p>
                            </Flex>
                        </>
                        :
                        <>
                            <Flex>
                                <Checkbox />
                                <p>Get alerts when a new support ticket is submitted</p>
                            </Flex>
                            <Flex>
                                <Checkbox />
                                <p>Be notified when an invoice is marked overdue</p>
                            </Flex>
                            <Flex>
                                <Checkbox />
                                <p>Receive updates when a new user or company registers</p>
                            </Flex>
                            <Flex>
                                <Checkbox />
                                <p>Get notified about critical system activities or errors</p>
                            </Flex>
                            <Flex>
                                <Checkbox />
                                <p>Receive weekly summary reports on user and company activity</p>
                            </Flex>
                        </>

                    }
                </Stack>
                <Flex>
                    <Switch
                    />
                    <Label htmlFor="airplane-mode">On /Off all notifications</Label>
                </Flex>
                <Box className='flex lg:justify-end justify-center lg:mt-auto py-8 px-6'>
                    <Button className='h-12 w-full lg:w-44 px-10 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer'>
                        Update & Save
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}

export default Notificationsetting