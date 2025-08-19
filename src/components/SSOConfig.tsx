import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Shield } from "lucide-react";
import { useState } from "react";

interface SSOConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const SSOConfig = ({ values, onUpdate }: SSOConfigProps) => {
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
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
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

            <div className="bg-muted/50 p-4 rounded-lg border border-border mt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Note:</strong> All fields must be filled for SSO configuration to be included in the generated YAML.
                Leave empty to omit the entire SSO configuration block.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};