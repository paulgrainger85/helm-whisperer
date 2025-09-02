import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Settings, Key, Shield, Database, Lock, RotateCcw } from "lucide-react";
import { useState } from "react";

interface KestraConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
  onReset: () => void;
}

export const KestraConfig = ({ values, onUpdate, onReset }: KestraConfigProps) => {
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
                    <SelectItem value="environment">Environment Variables</SelectItem>
                    <SelectItem value="azure-key-vault">Azure Key Vault</SelectItem>
                    <SelectItem value="aws-secrets-manager">AWS Secrets Manager</SelectItem>
                    <SelectItem value="gcp-secret-manager">GCP Secret Manager</SelectItem>
                    <SelectItem value="hashicorp-vault">HashiCorp Vault</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {values.configuration?.kestra?.secrets?.type && (
                <div className="space-y-4">
                  {/* Azure Key Vault */}
                  {values.configuration.kestra.secrets.type === 'azure-key-vault' && (
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                      <h5 className="text-sm font-medium">Azure Key Vault Configuration</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="azure-tenant-id">Tenant ID</Label>
                          <Input
                            id="azure-tenant-id"
                            value={values.configuration?.kestra?.secrets?.azureKeyVault?.clientSecret?.tenantId || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.azureKeyVault.clientSecret.tenantId', e.target.value)}
                            placeholder="Azure tenant ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="azure-client-id">Client ID</Label>
                          <Input
                            id="azure-client-id"
                            value={values.configuration?.kestra?.secrets?.azureKeyVault?.clientSecret?.clientId || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.azureKeyVault.clientSecret.clientId', e.target.value)}
                            placeholder="Azure client ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="azure-client-secret">Client Secret</Label>
                          <Input
                            id="azure-client-secret"
                            type="password"
                            value={values.configuration?.kestra?.secrets?.azureKeyVault?.clientSecret?.clientSecret || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.azureKeyVault.clientSecret.clientSecret', e.target.value)}
                            placeholder="Azure client secret"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="azure-vault-url">Vault URL</Label>
                          <Input
                            id="azure-vault-url"
                            value={values.configuration?.kestra?.secrets?.azureKeyVault?.vaultUrl || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.azureKeyVault.vaultUrl', e.target.value)}
                            placeholder="https://your-vault.vault.azure.net/"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AWS Secrets Manager */}
                  {values.configuration.kestra.secrets.type === 'aws-secrets-manager' && (
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                      <h5 className="text-sm font-medium">AWS Secrets Manager Configuration</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="aws-region">Region</Label>
                          <Input
                            id="aws-region"
                            value={values.configuration?.kestra?.secrets?.awsSecretsManager?.region || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.awsSecretsManager.region', e.target.value)}
                            placeholder="us-east-1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="aws-access-key">Access Key ID</Label>
                          <Input
                            id="aws-access-key"
                            value={values.configuration?.kestra?.secrets?.awsSecretsManager?.accessKeyId || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.awsSecretsManager.accessKeyId', e.target.value)}
                            placeholder="AWS access key ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="aws-secret-key">Secret Access Key</Label>
                          <Input
                            id="aws-secret-key"
                            type="password"
                            value={values.configuration?.kestra?.secrets?.awsSecretsManager?.secretAccessKey || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.awsSecretsManager.secretAccessKey', e.target.value)}
                            placeholder="AWS secret access key"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="aws-session-token">Session Token (Optional)</Label>
                          <Input
                            id="aws-session-token"
                            value={values.configuration?.kestra?.secrets?.awsSecretsManager?.sessionToken || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.awsSecretsManager.sessionToken', e.target.value)}
                            placeholder="AWS session token"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GCP Secret Manager */}
                  {values.configuration.kestra.secrets.type === 'gcp-secret-manager' && (
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                      <h5 className="text-sm font-medium">GCP Secret Manager Configuration</h5>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="gcp-project">Project ID</Label>
                          <Input
                            id="gcp-project"
                            value={values.configuration?.kestra?.secrets?.gcpSecretManager?.project || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.gcpSecretManager.project', e.target.value)}
                            placeholder="your-gcp-project-id"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gcp-service-account">Service Account Key (JSON)</Label>
                          <Textarea
                            id="gcp-service-account"
                            value={values.configuration?.kestra?.secrets?.gcpSecretManager?.serviceAccountKey || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.gcpSecretManager.serviceAccountKey', e.target.value)}
                            placeholder='{"type": "service_account", "project_id": "...", ...}'
                            rows={4}
                            className="font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* HashiCorp Vault */}
                  {values.configuration.kestra.secrets.type === 'hashicorp-vault' && (
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                      <h5 className="text-sm font-medium">HashiCorp Vault Configuration</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="vault-address">Vault Address</Label>
                          <Input
                            id="vault-address"
                            value={values.configuration?.kestra?.secrets?.hashicorpVault?.address || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.hashicorpVault.address', e.target.value)}
                            placeholder="https://vault.example.com:8200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vault-token">Token</Label>
                          <Input
                            id="vault-token"
                            type="password"
                            value={values.configuration?.kestra?.secrets?.hashicorpVault?.token || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.hashicorpVault.token', e.target.value)}
                            placeholder="Vault token"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vault-path">Engine Path</Label>
                          <Input
                            id="vault-path"
                            value={values.configuration?.kestra?.secrets?.hashicorpVault?.enginePath || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.hashicorpVault.enginePath', e.target.value)}
                            placeholder="secret/"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vault-namespace">Namespace (Optional)</Label>
                          <Input
                            id="vault-namespace"
                            value={values.configuration?.kestra?.secrets?.hashicorpVault?.namespace || ""}
                            onChange={(e) => onUpdate('configuration.kestra.secrets.hashicorpVault.namespace', e.target.value)}
                            placeholder="vault namespace"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Environment Variables */}
                  {values.configuration.kestra.secrets.type === 'environment' && (
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                      <h5 className="text-sm font-medium">Environment Variables Configuration</h5>
                      <p className="text-sm text-muted-foreground">
                        Secrets will be loaded from environment variables. No additional configuration required.
                        Variables should follow the pattern: KESTRA_SECRET_[SECRET_NAME]
                      </p>
                    </div>
                  )}
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