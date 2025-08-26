import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

export default function GrantAdminForm({
  handleGrantAdmin,
  email,
  setEmail,
  isValidEmail,
}: {
  handleGrantAdmin: () => void;
  email: string;
  setEmail: (email: string) => void;
  isValidEmail: (email: string) => boolean;
}) {
  return (
    <Card className="mb-8 bg-card/50 border-card-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-brand" />
          <span className="span text-primary">Grant Admin Privileges</span>
        </CardTitle>
        <CardDescription>
          Enter a users email address to grant them admin privileges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="email" className="sr-only">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter user email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900 border-chart-2 text-primary-foreground"
            />
          </div>
          <Button
            onClick={handleGrantAdmin}
            className="bg-brand hover:bg-brand/90 text-black font-medium px-6"
            disabled={!isValidEmail(email)}
          >
            Grant Admin
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
