import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Database } from "lucide-react";
import { useState } from "react";

interface PostgreSQLConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const PostgreSQLConfig = ({ values, onUpdate }: PostgreSQLConfigProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>PostgreSQL</CardTitle>
                <CardDescription>Enable PostgreSQL database deployment</CardDescription>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-base font-medium">PostgreSQL Database</p>
                  <p className="text-sm text-muted-foreground">Deploy PostgreSQL instance</p>
                </div>
              </div>
              <Switch
                checked={values.postgresql?.enabled || false}
                onCheckedChange={(checked) => onUpdate('postgresql.enabled', checked)}
              />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};