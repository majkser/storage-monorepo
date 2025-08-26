import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { Trash2 } from 'lucide-react';

export default function CurrentAdmins({
  adminEmails,
  handleRevokeAdmin,
}: {
  adminEmails: string[];
  handleRevokeAdmin: (email: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Current Administrators</h2>
        <Badge
          variant="secondary"
          className="bg-brand/20 text-brand border-brand/30"
        >
          {adminEmails.length} Admin{adminEmails.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="space-y-3">
        {adminEmails.map((email) => (
          <Card key={email} className="bg-card border-card-background">
            <CardContent className="p-4">
              <div className="flex items-center justify-between sm:flex-row sm:gap-0 flex-col gap-8">
                <div className="flex items-center gap-4 sm:flex-row flex-col">
                  <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
                    <Crown className="w-10 h-10 text-brand" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 sm:flex-row flex-col">
                      <h5 className="span font-medium text-primary">{email}</h5>
                      <Badge
                        variant="outline"
                        className="text-xs border-brand/30 text-brand"
                      >
                        Admin
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevokeAdmin(email)}
                    className="text-destructive border-destructive bg-destructive/10 hover:bg-destructive/20 hover:text-destructive-foreground transition-colors duration-200 shadow-sm rounded-md px-3 py-1"
                    disabled={email === 'mikser.kowalski@gmail.com'}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Revoke
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
