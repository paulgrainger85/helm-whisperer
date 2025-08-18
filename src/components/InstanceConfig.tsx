import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Container } from "lucide-react";
import { useState } from "react";

interface InstanceConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const InstanceConfig = ({ values, onUpdate }: InstanceConfigProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center space-x-2">
              <Container className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Instance Level Settings</CardTitle>
                <CardDescription>Configure container image and pull secrets</CardDescription>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="repository">Image Repository</Label>
                <Input
                  id="repository"
                  value={values.image?.repository || "kestra/kestra"}
                  onChange={(e) => onUpdate('image.repository', e.target.value)}
                  placeholder="kestra/kestra"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag">Image Tag</Label>
                <Input
                  id="tag"
                  value={values.image?.tag || "latest"}
                  onChange={(e) => onUpdate('image.tag', e.target.value)}
                  placeholder="latest"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pullPolicy">Pull Policy</Label>
                <Select 
                  value={values.image?.pullPolicy || "IfNotPresent"} 
                  onValueChange={(value) => onUpdate('image.pullPolicy', value)}
                >
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
              <div className="space-y-2">
                <Label htmlFor="pullSecret">Image Pull Secret Name</Label>
                <Input
                  id="pullSecret"
                  value={values.imagePullSecrets?.name || ""}
                  onChange={(e) => onUpdate('imagePullSecrets.name', e.target.value)}
                  placeholder="registry-secret"
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};