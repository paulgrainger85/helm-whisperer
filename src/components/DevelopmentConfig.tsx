import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Wrench, Database, HardDrive, RotateCcw } from "lucide-react";
import { useState } from "react";

interface DevelopmentConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
  onReset: () => void;
}

export const DevelopmentConfig = ({ values, onUpdate, onReset }: DevelopmentConfigProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const developmentServices = [
    {
      key: 'postgresql',
      name: 'PostgreSQL',
      description: 'Database for development',
      icon: Database
    },
    {
      key: 'minio',
      name: 'MinIO',
      description: 'Object storage for development',
      icon: HardDrive
    }
  ];

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center space-x-2">
              <Wrench className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Development Deployment Settings</CardTitle>
                <CardDescription>Enable development services for local testing</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={onReset}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {developmentServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.key} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">{service.name}</Label>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={values[service.key]?.enabled || false}
                    onCheckedChange={(checked) => onUpdate(`${service.key}.enabled`, checked)}
                  />
                </div>
              );
            })}

            <div className="bg-muted/50 p-4 rounded-lg border border-border mt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Development Services:</strong> These services are typically used for local development and testing. Enable them if you need embedded database and storage solutions.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};