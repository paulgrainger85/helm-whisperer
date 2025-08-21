import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Settings, Code } from "lucide-react";
import { InstanceConfig } from "@/components/InstanceConfig";
import { DatabaseConfig } from "@/components/DatabaseConfig";
import { KestraConfig } from "@/components/KestraConfig";
import { DeploymentConfig } from "@/components/DeploymentConfig";
import { SSOConfig } from "@/components/SSOConfig";
import { DevelopmentConfig } from "@/components/DevelopmentConfig";
import { YamlPreview } from "@/components/YamlPreview";
import { generateYaml } from "@/lib/yaml-generator";
import { useToast } from "@/hooks/use-toast";

interface KestraHelmValues {
  image: {
    repository: string;
    tag: string;
    pullPolicy: string;
  };
  imagePullSecrets: {
    name: string;
  };
  configuration: {
    datasources: {
      postgres: {
        driverClassName: string;
        uri: string;
        username: string;
        password: string;
        options: string;
      };
    };
      kestra: {
        secrets: {
          type: string;
          jdbc?: string;
          elasticsearch?: string;
          azure?: string;
          aws?: string;
          google?: string;
          vault?: string;
          cyberark?: string;
        };
        storage: {
          type: string;
          s3?: string;
          gcs?: string;
          azure?: string;
          minio?: string;
        };
        encryption: {
          'secret-key': string;
        };
        queue: {
          type: string;
        };
        repository: {
          type: string;
        };
        ee: {
          license: {
            id: string;
            key: string;
            fingerprint: string;
          };
        };
      };
      micronaut?: {
        security?: {
          oauth2?: {
            enabled?: boolean;
            clients?: {
              providerName?: string;
              clientId?: string;
              clientSecret?: string;
              issuer?: string;
            };
          };
        };
      };
  };
  deployments: {
    webserver: {
      enabled: boolean;
    };
    executor: {
      enabled: boolean;
    };
    worker: {
      enabled: boolean;
    };
    scheduler: {
      enabled: boolean;
    };
    standalone: {
      enabled: boolean;
    };
  };
  postgresql: {
    enabled: boolean;
  };
  minio: {
    enabled: boolean;
  };
}

const Index = () => {
  const { toast } = useToast();
  // Define default values for each section
  const getDefaultValues = () => ({
    image: {
      repository: "registry.kestra.io/docker/kestra-ee",
      tag: "latest",
      pullPolicy: "IfNotPresent"
    },
    imagePullSecrets: {
      name: ""
    },
    configuration: {
      datasources: {
        postgres: {
          driverClassName: "org.postgresql.Driver",
          uri: "",
          username: "",
          password: "",
          options: ""
        }
      },
      kestra: {
        secrets: {
          type: "",
          jdbc: "",
          elasticsearch: "",
          azure: "",
          aws: "",
          google: "",
          vault: "",
          cyberark: ""
        },
        storage: {
          type: "",
          s3: "",
          gcs: "",
          azure: "",
          minio: ""
        },
        encryption: {
          'secret-key': ""
        },
        queue: {
          type: "postgres"
        },
        repository: {
          type: "postgres"
        },
        ee: {
          license: {
            id: "",
            key: "",
            fingerprint: ""
          }
        }
      },
    },
    deployments: {
      webserver: {
        enabled: true
      },
      executor: {
        enabled: false
      },
      worker: {
        enabled: false
      },
      scheduler: {
        enabled: false
      },
      standalone: {
        enabled: false
      }
    },
    postgresql: {
      enabled: false
    },
    minio: {
      enabled: false
    }
  });

  const [values, setValues] = useState<KestraHelmValues>(getDefaultValues());

  // Reset functions for each section
  const resetInstanceConfig = () => {
    const defaultValues = getDefaultValues();
    setValues(prev => ({
      ...prev,
      image: defaultValues.image,
      imagePullSecrets: defaultValues.imagePullSecrets
    }));
  };

  const resetDatabaseConfig = () => {
    const defaultValues = getDefaultValues();
    setValues(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        datasources: defaultValues.configuration.datasources
      }
    }));
  };

  const resetKestraConfig = () => {
    const defaultValues = getDefaultValues();
    setValues(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        kestra: defaultValues.configuration.kestra
      }
    }));
  };

  const resetSSOConfig = () => {
    setValues(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        micronaut: undefined
      }
    }));
  };

  const resetDeploymentConfig = () => {
    const defaultValues = getDefaultValues();
    setValues(prev => ({
      ...prev,
      deployments: defaultValues.deployments
    }));
  };

  const resetDevelopmentConfig = () => {
    const defaultValues = getDefaultValues();
    setValues(prev => ({
      ...prev,
      postgresql: defaultValues.postgresql,
      minio: defaultValues.minio
    }));
  };

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
            <InstanceConfig values={values} onUpdate={updateValues} onReset={resetInstanceConfig} />
            <DatabaseConfig values={values} onUpdate={updateValues} onReset={resetDatabaseConfig} />
            <KestraConfig values={values} onUpdate={updateValues} onReset={resetKestraConfig} />
            <SSOConfig values={values} onUpdate={updateValues} onReset={resetSSOConfig} />
            <DeploymentConfig values={values} onUpdate={updateValues} onReset={resetDeploymentConfig} />
            <DevelopmentConfig values={values} onUpdate={updateValues} onReset={resetDevelopmentConfig} />
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