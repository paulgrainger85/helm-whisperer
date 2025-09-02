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
import { usePersistedState } from "@/hooks/use-persisted-state";

interface KestraHelmValues {
  image: {
    image: string;
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
          jdbc?: {
            secret: string;
          };
          azureKeyVault?: {
            clientSecret: {
              tenantId: string;
              clientId: string;
              clientSecret: string;
            };
            vaultUrl: string;
          };
          awsSecretsManager?: {
            region: string;
            accessKeyId: string;
            secretAccessKey: string;
            sessionToken?: string;
          };
          gcpSecretManager?: {
            project: string;
            serviceAccountKey: string;
          };
          hashicorpVault?: {
            address: string;
            token: string;
            enginePath: string;
            namespace?: string;
          };
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
      resources?: {
        requests?: {
          cpu?: string;
          memory?: string;
        };
        limits?: {
          cpu?: string;
          memory?: string;
        };
      };
    };
    executor: {
      enabled: boolean;
      resources?: {
        requests?: {
          cpu?: string;
          memory?: string;
        };
        limits?: {
          cpu?: string;
          memory?: string;
        };
      };
    };
    worker: {
      enabled: boolean;
      resources?: {
        requests?: {
          cpu?: string;
          memory?: string;
        };
        limits?: {
          cpu?: string;
          memory?: string;
        };
      };
    };
    scheduler: {
      enabled: boolean;
      resources?: {
        requests?: {
          cpu?: string;
          memory?: string;
        };
        limits?: {
          cpu?: string;
          memory?: string;
        };
      };
    };
    standalone: {
      enabled: boolean;
      resources?: {
        requests?: {
          cpu?: string;
          memory?: string;
        };
        limits?: {
          cpu?: string;
          memory?: string;
        };
      };
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
      image: "registry.kestra.io/docker/kestra-ee",
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
          type: ""
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
      standalone: {
        enabled: true,
        resources: {
          requests: { cpu: '', memory: '' },
          limits: { cpu: '', memory: '' }
        }
      },
      webserver: {
        enabled: false,
        resources: {
          requests: { cpu: '', memory: '' },
          limits: { cpu: '', memory: '' }
        }
      },
      executor: {
        enabled: false,
        resources: {
          requests: { cpu: '', memory: '' },
          limits: { cpu: '', memory: '' }
        }
      },
      worker: {
        enabled: false,
        resources: {
          requests: { cpu: '', memory: '' },
          limits: { cpu: '', memory: '' }
        }
      },
      scheduler: {
        enabled: false,
        resources: {
          requests: { cpu: '', memory: '' },
          limits: { cpu: '', memory: '' }
        }
      }
    },
    postgresql: {
      enabled: false
    },
    minio: {
      enabled: false
    }
  });

  const [values, setValues] = usePersistedState<KestraHelmValues>('kestra-helm-values', getDefaultValues());

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
        if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
          current[keys[i]] = {};
        }
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
