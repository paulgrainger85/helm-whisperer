import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Shield, RotateCcw } from "lucide-react";
import { useState } from "react";

interface SSOConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
  onReset: () => void;
}

export const SSOConfig = ({ values, onUpdate, onReset }: SSOConfigProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>SSO Configuration</CardTitle>
                <CardDescription>Configure OAuth2/OIDC authentication</CardDescription>
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
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
              <div className="space-y-1">
                <Label htmlFor="oidc-enable" className="text-sm font-medium">Enable OIDC Provider</Label>
                <p className="text-xs text-muted-foreground">Toggle to include SSO configuration in the YAML output</p>
              </div>
              <Switch
                id="oidc-enable"
                checked={values.configuration?.oidcEnabled || false}
                onCheckedChange={(checked) => onUpdate("configuration.oidcEnabled", checked)}
              />
            </div>
            
            {values.configuration?.oidcEnabled && (
              <div className="space-y-4">
              <div>
                <Label htmlFor="oidc-provider">OIDC Provider Name</Label>
                <Input
                  id="oidc-provider"
                  placeholder="e.g., google, okta, auth0"
                  value={values.configuration?.micronaut?.security?.oauth2?.clients?.providerName || ""}
                  onChange={(e) => onUpdate("configuration.micronaut.security.oauth2.clients.providerName", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="client-id">Client ID</Label>
                <Input
                  id="client-id"
                  placeholder="Your OAuth2 client ID"
                  value={values.configuration?.micronaut?.security?.oauth2?.clients?.clientId || ""}
                  onChange={(e) => onUpdate("configuration.micronaut.security.oauth2.clients.clientId", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="client-secret">Client Secret</Label>
                <Input
                  id="client-secret"
                  type="password"
                  placeholder="Your OAuth2 client secret"
                  value={values.configuration?.micronaut?.security?.oauth2?.clients?.clientSecret || ""}
                  onChange={(e) => onUpdate("configuration.micronaut.security.oauth2.clients.clientSecret", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="issuer">Issuer URL</Label>
                <Input
                  id="issuer"
                  placeholder="https://your-provider.com/.well-known/openid_configuration"
                  value={values.configuration?.micronaut?.security?.oauth2?.clients?.issuer || ""}
                  onChange={(e) => onUpdate("configuration.micronaut.security.oauth2.clients.issuer", e.target.value)}
                />
              </div>
              </div>
            )}

            <div className="bg-muted/50 p-4 rounded-lg border border-border mt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Note:</strong> Enable the toggle above to include SSO configuration. 
                When enabled, all OIDC fields should be filled for proper configuration.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};