import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Settings, Code } from "lucide-react";
import { ResourceConfig } from "@/components/ResourceConfig";
import { IngressConfig } from "@/components/IngressConfig";
import { ServiceConfig } from "@/components/ServiceConfig";
import { StorageConfig } from "@/components/StorageConfig";
import { EnvConfig } from "@/components/EnvConfig";
import { YamlPreview } from "@/components/YamlPreview";
import { generateYaml } from "@/lib/yaml-generator";
import { useToast } from "@/hooks/use-toast";

interface HelmValues {
  replicaCount: number;
  image: {
    repository: string;
    tag: string;
    pullPolicy: string;
  };
  resources: {
    limits: {
      cpu: string;
      memory: string;
    };
    requests: {
      cpu: string;
      memory: string;
    };
  };
  ingress: {
    enabled: boolean;
    className: string;
    host: string;
    tls: boolean;
  };
  service: {
    type: string;
    port: number;
  };
  persistence: {
    enabled: boolean;
    size: string;
    storageClass: string;
  };
  env: Array<{ name: string; value: string }>;
}

const Index = () => {
  const { toast } = useToast();
  const [values, setValues] = useState<HelmValues>({
    replicaCount: 1,
    image: {
      repository: "nginx",
      tag: "latest",
      pullPolicy: "IfNotPresent"
    },
    resources: {
      limits: {
        cpu: "500m",
        memory: "512Mi"
      },
      requests: {
        cpu: "250m",
        memory: "256Mi"
      }
    },
    ingress: {
      enabled: false,
      className: "nginx",
      host: "example.com",
      tls: false
    },
    service: {
      type: "ClusterIP",
      port: 80
    },
    persistence: {
      enabled: false,
      size: "1Gi",
      storageClass: "standard"
    },
    env: []
  });

  const [showPreview, setShowPreview] = useState(true);

  const updateValues = (path: string, value: any) => {
    setValues(prev => {
      const newValues = { ...prev };
      const keys = path.split('.');
      let current = newValues as any;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newValues;
    });
  };

  const downloadYaml = () => {
    const yaml = generateYaml(values);
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'values.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Your values.yaml file has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-glow rounded-md flex items-center justify-center">
                <Settings className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Helm Values Builder</h1>
                <p className="text-sm text-muted-foreground">Generate Helm chart values without writing YAML</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="secondary"
                size="sm"
              >
                <Code className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              <Button onClick={downloadYaml} className="bg-gradient-to-r from-primary to-purple-glow hover:opacity-90 transition-opacity">
                <Download className="w-4 h-4 mr-2" />
                Download YAML
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <div className="space-y-6">
            <ResourceConfig values={values} onUpdate={updateValues} />
            <ServiceConfig values={values} onUpdate={updateValues} />
            <IngressConfig values={values} onUpdate={updateValues} />
            <StorageConfig values={values} onUpdate={updateValues} />
            <EnvConfig values={values} onUpdate={updateValues} />
          </div>

          {/* YAML Preview */}
          {showPreview && (
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <YamlPreview values={values} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;