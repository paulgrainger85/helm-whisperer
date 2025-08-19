import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Database } from "lucide-react";
import { useState } from "react";

interface DatabaseConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const DatabaseConfig = ({ values, onUpdate }: DatabaseConfigProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Database Configuration</CardTitle>
                <CardDescription>Configure datasource connection settings</CardDescription>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="db-uri">Database URI</Label>
              <Input
                id="db-uri"
                value={values.configuration?.datasources?.postgres?.uri || ""}
                onChange={(e) => onUpdate('configuration.datasources.postgres.uri', e.target.value)}
                placeholder="jdbc:postgresql://localhost:5432/kestra"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="db-username">Username</Label>
                <Input
                  id="db-username"
                  value={values.configuration?.datasources?.postgres?.username || ""}
                  onChange={(e) => onUpdate('configuration.datasources.postgres.username', e.target.value)}
                  placeholder="kestra"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-password">Password</Label>
                <Input
                  id="db-password"
                  type="password"
                  value={values.configuration?.datasources?.postgres?.password || ""}
                  onChange={(e) => onUpdate('configuration.datasources.postgres.password', e.target.value)}
                  placeholder="password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="db-options">Additional Options</Label>
              <Textarea
                id="db-options"
                value={values.configuration?.datasources?.postgres?.options || ""}
                onChange={(e) => onUpdate('configuration.datasources.postgres.options', e.target.value)}
                placeholder="Additional database connection options..."
                rows={3}
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Configure your database connection for Kestra. Supported databases include PostgreSQL, MySQL, and H2.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};