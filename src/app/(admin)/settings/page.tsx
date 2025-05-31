"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BellRing, Mail, MessageSquare } from "lucide-react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // Here you would typically save these settings to a backend
    console.log("Settings saved:", { emailNotifications, pushNotifications, smsNotifications });
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <BellRing className="mr-3 h-6 w-6 text-primary" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Manage how you receive notifications from PosterBuilder Pro.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
            <div className="flex items-center">
              <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="email-notifications" className="text-base font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Receive important updates and alerts via email.</p>
              </div>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              aria-label="Toggle email notifications"
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
            <div className="flex items-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-muted-foreground lucide lucide-smartphone-nfc"><rect width="10" height="18" x="7" y="3" rx="2"/><path d="M12 19.5v.01"/><path d="M4 8c-1.5 2.5-1.5 5.5 0 8"/><path d="M20 8c1.5 2.5 1.5 5.5 0 8"/></svg>
              <div>
                <Label htmlFor="push-notifications" className="text-base font-medium">
                  Push Notifications
                </Label>
                 <p className="text-sm text-muted-foreground">Get real-time alerts directly on your device (coming soon).</p>
              </div>
            </div>
            <Switch
              id="push-notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
              disabled // Feature coming soon
              aria-label="Toggle push notifications"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
            <div className="flex items-center">
              <MessageSquare className="mr-3 h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="sms-notifications" className="text-base font-medium">
                  SMS Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Receive critical alerts via SMS (coming soon).</p>
              </div>
            </div>
            <Switch
              id="sms-notifications"
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
              disabled // Feature coming soon
              aria-label="Toggle SMS notifications"
            />
          </div>

          <div className="pt-6 flex justify-end">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
