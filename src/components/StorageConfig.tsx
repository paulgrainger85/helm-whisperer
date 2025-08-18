import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HardDrive } from "lucide-react";

interface StorageConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const StorageConfig = ({ values, onUpdate }: StorageConfigProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <HardDrive className="w-5 h-5 text-primary" />
          <span>Persistent Storage</span>
        </CardTitle>
        <CardDescription>Configure persistent volumes for data storage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="storage-enabled">Enable Persistence</Label>
            <p className="text-sm text-muted-foreground">Use persistent volumes for data storage</p>
          </div>
          <Switch
            id="storage-enabled"
            checked={values.persistence.enabled}
            onCheckedChange={(checked) => onUpdate('persistence.enabled', checked)}
          />
        </div>

        {values.persistence.enabled && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storage-size">Storage Size</Label>
                <Input
                  id="storage-size"
                  value={values.persistence.size}
                  onChange={(e) => onUpdate('persistence.size', e.target.value)}
                  placeholder="1Gi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storage-class">Storage Class</Label>
                <Select value={values.persistence.storageClass} onValueChange={(value) => onUpdate('persistence.storageClass', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">standard</SelectItem>
                    <SelectItem value="gp2">gp2 (AWS)</SelectItem>
                    <SelectItem value="gp3">gp3 (AWS)</SelectItem>
                    <SelectItem value="premium-rwo">premium-rwo (GCP)</SelectItem>
                    <SelectItem value="managed-premium">managed-premium (Azure)</SelectItem>
                    <SelectItem value="local-path">local-path</SelectItem>
                    <SelectItem value="nfs">nfs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                Storage classes determine the type of storage provisioned. Choose based on your cluster's available storage classes.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};