import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cpu, HardDrive } from "lucide-react";

interface ResourceConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const ResourceConfig = ({ values, onUpdate }: ResourceConfigProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-primary" />
          <span>Resources & Image</span>
        </CardTitle>
        <CardDescription>Configure container resources and image settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="replicas">Replica Count</Label>
            <Input
              id="replicas"
              type="number"
              value={values.replicaCount}
              onChange={(e) => onUpdate('replicaCount', parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pullPolicy">Pull Policy</Label>
            <Select value={values.image.pullPolicy} onValueChange={(value) => onUpdate('image.pullPolicy', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Always">Always</SelectItem>
                <SelectItem value="IfNotPresent">If Not Present</SelectItem>
                <SelectItem value="Never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="repository">Image Repository</Label>
            <Input
              id="repository"
              value={values.image.repository}
              onChange={(e) => onUpdate('image.repository', e.target.value)}
              placeholder="nginx"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tag">Image Tag</Label>
            <Input
              id="tag"
              value={values.image.tag}
              onChange={(e) => onUpdate('image.tag', e.target.value)}
              placeholder="latest"
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-4 text-foreground">Resource Limits</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpu-limit">CPU Limit</Label>
              <Input
                id="cpu-limit"
                value={values.resources.limits.cpu}
                onChange={(e) => onUpdate('resources.limits.cpu', e.target.value)}
                placeholder="500m"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memory-limit">Memory Limit</Label>
              <Input
                id="memory-limit"
                value={values.resources.limits.memory}
                onChange={(e) => onUpdate('resources.limits.memory', e.target.value)}
                placeholder="512Mi"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-4 text-foreground">Resource Requests</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpu-request">CPU Request</Label>
              <Input
                id="cpu-request"
                value={values.resources.requests.cpu}
                onChange={(e) => onUpdate('resources.requests.cpu', e.target.value)}
                placeholder="250m"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memory-request">Memory Request</Label>
              <Input
                id="memory-request"
                value={values.resources.requests.memory}
                onChange={(e) => onUpdate('resources.requests.memory', e.target.value)}
                placeholder="256Mi"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};