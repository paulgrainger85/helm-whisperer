import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Layers, Server, Cpu, Calendar, Play, Monitor } from "lucide-react";
import { useState } from "react";

interface DeploymentConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const DeploymentConfig = ({ values, onUpdate }: DeploymentConfigProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const deployments = [
    { 
      key: 'webserver', 
      name: 'Webserver', 
      description: 'Web UI and API server',
      icon: Monitor 
    },
    { 
      key: 'executor', 
      name: 'Executor', 
      description: 'Task execution engine',
      icon: Play 
    },
    { 
      key: 'worker', 
      name: 'Worker', 
      description: 'Background task processor',
      icon: Cpu 
    },
    { 
      key: 'scheduler', 
      name: 'Scheduler', 
      description: 'Task scheduling service',
      icon: Calendar 
    },
    { 
      key: 'standalone', 
      name: 'Standalone', 
      description: 'All-in-one deployment',
      icon: Server 
    }
  ];

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Deployment Level Settings</CardTitle>
                <CardDescription>Enable/disable individual Kestra services</CardDescription>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {deployments.map((deployment) => {
              const IconComponent = deployment.icon;
              return (
                <div key={deployment.key} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">{deployment.name}</Label>
                      <p className="text-sm text-muted-foreground">{deployment.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={values[deployment.key]?.enabled || false}
                    onCheckedChange={(checked) => onUpdate(`${deployment.key}.enabled`, checked)}
                  />
                </div>
              );
            })}

            <div className="bg-muted/50 p-4 rounded-lg border border-border mt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Standalone:</strong> Single instance with all services<br/>
                <strong>Microservices:</strong> Enable individual services (webserver, executor, worker, scheduler) for distributed deployment
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};