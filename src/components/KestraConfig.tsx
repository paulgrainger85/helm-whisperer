import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Settings, Key, Shield, Database, Lock } from "lucide-react";
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
                <Label htmlFor="secrets-type">Secret Manager Type</Label>
                <Select
                  value={values.configuration?.kestra?.secrets?.type || ""}
                  onValueChange={(value) => onUpdate('configuration.kestra.secrets.type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select secret manager type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jdbc">JDBC</SelectItem>
                    <SelectItem value="elasticsearch">Elasticsearch</SelectItem>
                    <SelectItem value="azure">Azure</SelectItem>
                    <SelectItem value="aws">AWS</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="vault">Vault</SelectItem>
                    <SelectItem value="cyberark">CyberArk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {values.configuration?.kestra?.secrets?.type && (
                <div className="space-y-2">
                  <Label htmlFor="secrets-config">
                    {values.configuration.kestra.secrets.type.charAt(0).toUpperCase() + 
                     values.configuration.kestra.secrets.type.slice(1)} Configuration
                  </Label>
                  <Textarea
                    id="secrets-config"
                    value={values.configuration?.kestra?.secrets?.[values.configuration.kestra.secrets.type] || ""}
                    onChange={(e) => onUpdate(`configuration.kestra.secrets.${values.configuration.kestra.secrets.type}`, e.target.value)}
                    placeholder={`Configure ${values.configuration.kestra.secrets.type} settings (YAML format)...`}
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
              )}
            </div>

            {/* Internal Storage Configuration */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <Database className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-medium text-foreground">Internal Storage</h4>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storage-type">Storage Type</Label>
                <Select
                  value={values.configuration?.kestra?.storage?.type || ""}
                  onValueChange={(value) => onUpdate('configuration.kestra.storage.type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select storage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s3">S3</SelectItem>
                    <SelectItem value="gcs">GCS</SelectItem>
                    <SelectItem value="azure">Azure</SelectItem>
                    <SelectItem value="minio">MinIO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {values.configuration?.kestra?.storage?.type && (
                <div className="space-y-2">
                  <Label htmlFor="storage-config">
                    {values.configuration.kestra.storage.type.toUpperCase()} Configuration
                  </Label>
                  <Textarea
                    id="storage-config"
                    value={values.configuration?.kestra?.storage?.[values.configuration.kestra.storage.type] || ""}
                    onChange={(e) => onUpdate(`configuration.kestra.storage.${values.configuration.kestra.storage.type}`, e.target.value)}
                    placeholder={`Configure ${values.configuration.kestra.storage.type} settings (YAML format)...`}
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
              )}
            </div>

            {/* Encryption Configuration */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <Lock className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-medium text-foreground">Encryption</h4>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="encryption-key">Secret Key</Label>
                <Input
                  id="encryption-key"
                  value={values.configuration?.kestra?.encryption?.['secret-key'] || ""}
                  onChange={(e) => onUpdate('configuration.kestra.encryption.secret-key', e.target.value)}
                  placeholder="Enter encryption secret key"
                  type="password"
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