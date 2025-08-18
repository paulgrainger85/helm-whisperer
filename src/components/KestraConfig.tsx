import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Settings, Key, Shield } from "lucide-react";
import { useState } from "react";

interface KestraConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const KestraConfig = ({ values, onUpdate }: KestraConfigProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Kestra Configuration</CardTitle>
                <CardDescription>Configure Kestra-specific settings and licensing</CardDescription>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Secrets Configuration */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <Key className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-medium text-foreground">Secrets Configuration</h4>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secrets-config">Secrets Configuration</Label>
                <Textarea
                  id="secrets-config"
                  value={values.configuration?.kestra?.secrets || ""}
                  onChange={(e) => onUpdate('configuration.kestra.secrets', e.target.value)}
                  placeholder="Configure secrets management..."
                  rows={4}
                />
              </div>
            </div>

            {/* Enterprise Edition Configuration */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-medium text-foreground">Enterprise Edition License</h4>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="license-id">License ID</Label>
                <Input
                  id="license-id"
                  value={values.configuration?.kestra?.ee?.license?.id || ""}
                  onChange={(e) => onUpdate('configuration.kestra.ee.license.id', e.target.value)}
                  placeholder="Enter license ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license-key">License Key</Label>
                <Textarea
                  id="license-key"
                  value={values.configuration?.kestra?.ee?.license?.key || ""}
                  onChange={(e) => onUpdate('configuration.kestra.ee.license.key', e.target.value)}
                  placeholder="Enter license key"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license-fingerprint">License Fingerprint</Label>
                <Input
                  id="license-fingerprint"
                  value={values.configuration?.kestra?.ee?.license?.fingerprint || ""}
                  onChange={(e) => onUpdate('configuration.kestra.ee.license.fingerprint', e.target.value)}
                  placeholder="Enter license fingerprint"
                />
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Configure Kestra-specific settings including secrets management and Enterprise Edition licensing. 
                Contact Kestra support for license information.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};