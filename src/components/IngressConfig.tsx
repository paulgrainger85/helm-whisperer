import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Shield } from "lucide-react";

interface IngressConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const IngressConfig = ({ values, onUpdate }: IngressConfigProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-primary" />
          <span>Ingress</span>
        </CardTitle>
        <CardDescription>Configure external access and routing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="ingress-enabled">Enable Ingress</Label>
            <p className="text-sm text-muted-foreground">Expose the service externally</p>
          </div>
          <Switch
            id="ingress-enabled"
            checked={values.ingress.enabled}
            onCheckedChange={(checked) => onUpdate('ingress.enabled', checked)}
          />
        </div>

        {values.ingress.enabled && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ingress-class">Ingress Class</Label>
                <Select value={values.ingress.className} onValueChange={(value) => onUpdate('ingress.className', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nginx">nginx</SelectItem>
                    <SelectItem value="traefik">traefik</SelectItem>
                    <SelectItem value="haproxy">haproxy</SelectItem>
                    <SelectItem value="istio">istio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="host">Host</Label>
                <Input
                  id="host"
                  value={values.ingress.host}
                  onChange={(e) => onUpdate('ingress.host', e.target.value)}
                  placeholder="example.com"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <div>
                  <Label htmlFor="tls-enabled">Enable TLS</Label>
                  <p className="text-sm text-muted-foreground">Use HTTPS with TLS certificates</p>
                </div>
              </div>
              <Switch
                id="tls-enabled"
                checked={values.ingress.tls}
                onCheckedChange={(checked) => onUpdate('ingress.tls', checked)}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};