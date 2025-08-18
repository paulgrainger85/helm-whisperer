import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network } from "lucide-react";

interface ServiceConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const ServiceConfig = ({ values, onUpdate }: ServiceConfigProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Network className="w-5 h-5 text-primary" />
          <span>Service</span>
        </CardTitle>
        <CardDescription>Configure how the service is exposed within the cluster</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="service-type">Service Type</Label>
            <Select value={values.service.type} onValueChange={(value) => onUpdate('service.type', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ClusterIP">ClusterIP</SelectItem>
                <SelectItem value="NodePort">NodePort</SelectItem>
                <SelectItem value="LoadBalancer">LoadBalancer</SelectItem>
                <SelectItem value="ExternalName">ExternalName</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-port">Service Port</Label>
            <Input
              id="service-port"
              type="number"
              value={values.service.port}
              onChange={(e) => onUpdate('service.port', parseInt(e.target.value))}
              placeholder="80"
            />
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>ClusterIP:</strong> Internal access only<br/>
            <strong>NodePort:</strong> Accessible via node IP and port<br/>
            <strong>LoadBalancer:</strong> External load balancer (cloud provider)<br/>
            <strong>ExternalName:</strong> Maps to external DNS name
          </p>
        </div>
      </CardContent>
    </Card>
  );
};