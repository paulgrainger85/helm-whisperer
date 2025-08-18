import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, Settings2 } from "lucide-react";

interface EnvConfigProps {
  values: any;
  onUpdate: (path: string, value: any) => void;
}

export const EnvConfig = ({ values, onUpdate }: EnvConfigProps) => {
  const addEnvVar = () => {
    const newEnvVars = [...values.env, { name: '', value: '' }];
    onUpdate('env', newEnvVars);
  };

  const removeEnvVar = (index: number) => {
    const newEnvVars = values.env.filter((_: any, i: number) => i !== index);
    onUpdate('env', newEnvVars);
  };

  const updateEnvVar = (index: number, field: 'name' | 'value', value: string) => {
    const newEnvVars = [...values.env];
    newEnvVars[index] = { ...newEnvVars[index], [field]: value };
    onUpdate('env', newEnvVars);
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings2 className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Configure environment variables for your application</CardDescription>
            </div>
          </div>
          <Button onClick={addEnvVar} size="sm" className="bg-gradient-to-r from-primary to-purple-glow hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Variable
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {values.env.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Settings2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No environment variables configured</p>
            <p className="text-sm">Click "Add Variable" to get started</p>
          </div>
        ) : (
          values.env.map((envVar: any, index: number) => (
            <div key={index} className="flex gap-4 items-end p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`env-name-${index}`}>Name</Label>
                <Input
                  id={`env-name-${index}`}
                  value={envVar.name}
                  onChange={(e) => updateEnvVar(index, 'name', e.target.value)}
                  placeholder="API_KEY"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`env-value-${index}`}>Value</Label>
                <Input
                  id={`env-value-${index}`}
                  value={envVar.value}
                  onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                  placeholder="your-api-key"
                />
              </div>
              <Button
                onClick={() => removeEnvVar(index)}
                variant="outline"
                size="sm"
                className="mb-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};