import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Layers, Server, Cpu, Calendar, Play, Monitor, RotateCcw, Settings2 } from "lucide-react";
import { useState } from "react";

interface DeploymentConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
  onReset: () => void;
}

export const DeploymentConfig = ({ values, onUpdate, onReset }: DeploymentConfigProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedResources, setExpandedResources] = useState<{ [key: string]: boolean }>({});

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
          <CardContent className="space-y-6">
            {deployments.map((deployment) => {
              const IconComponent = deployment.icon;
              const isEnabled = values.deployments?.[deployment.key]?.enabled || false;
              const isResourcesExpanded = expandedResources[deployment.key] || false;
              
              return (
                <div key={deployment.key} className="rounded-lg border border-border bg-card/50 overflow-hidden">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <Label className="text-base font-medium">{deployment.name}</Label>
                        <p className="text-sm text-muted-foreground">{deployment.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {isEnabled && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedResources(prev => ({ ...prev, [deployment.key]: !prev[deployment.key] }))}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Settings2 className="w-4 h-4" />
                        </Button>
                      )}
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) => onUpdate(`deployments.${deployment.key}.enabled`, checked)}
                      />
                    </div>
                  </div>
                  
                  {isEnabled && isResourcesExpanded && (
                    <div className="px-4 pb-4 border-t border-border bg-muted/20">
                      <div className="pt-4">
                        <Label className="text-sm font-medium text-foreground mb-3 block">Kubernetes Resources</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Requests</Label>
                            <div className="space-y-2">
                              <div>
                                <Label className="text-xs text-muted-foreground">CPU</Label>
                                <Input
                                  placeholder="100m"
                                  value={values.deployments?.[deployment.key]?.resources?.requests?.cpu || ''}
                                  onChange={(e) => onUpdate(`deployments.${deployment.key}.resources.requests.cpu`, e.target.value)}
                                  className="h-8 text-xs"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Memory</Label>
                                <Input
                                  placeholder="512Mi"
                                  value={values.deployments?.[deployment.key]?.resources?.requests?.memory || ''}
                                  onChange={(e) => onUpdate(`deployments.${deployment.key}.resources.requests.memory`, e.target.value)}
                                  className="h-8 text-xs"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Limits</Label>
                            <div className="space-y-2">
                              <div>
                                <Label className="text-xs text-muted-foreground">CPU</Label>
                                <Input
                                  placeholder="1000m"
                                  value={values.deployments?.[deployment.key]?.resources?.limits?.cpu || ''}
                                  onChange={(e) => onUpdate(`deployments.${deployment.key}.resources.limits.cpu`, e.target.value)}
                                  className="h-8 text-xs"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Memory</Label>
                                <Input
                                  placeholder="1Gi"
                                  value={values.deployments?.[deployment.key]?.resources?.limits?.memory || ''}
                                  onChange={(e) => onUpdate(`deployments.${deployment.key}.resources.limits.memory`, e.target.value)}
                                  className="h-8 text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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