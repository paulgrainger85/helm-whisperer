export const generateYaml = (values: any): string => {
  const yamlLines: string[] = [];
  
  const addLine = (line: string, indent = 0) => {
    yamlLines.push('  '.repeat(indent) + line);
  };

  const processObject = (obj: any, indent = 0, parentObj: any = null) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }
      
      // Handle special case for minio key capitalization
      const displayKey = key === 'minio' ? 'minio' : key;
      
      // Special handling for secrets configuration
      if (key === 'secrets' && typeof value === 'object' && (value as any).type) {
        const secretsValue = value as any;
        addLine(`${displayKey}:`, indent);
        addLine(`type: ${formatValue(secretsValue.type)}`, indent + 1);
        
        // Add the specific secret manager configuration if it exists
        // Map kebab-case types to camelCase property names
        const typeMap: { [key: string]: string } = {
          'azure-key-vault': 'azureKeyVault',
          'aws-secrets-manager': 'awsSecretsManager',
          'gcp-secret-manager': 'gcpSecretManager',
          'hashicorp-vault': 'hashicorpVault',
          'jdbc': 'jdbc',
          'environment': 'environment'
        };
        const propertyName = typeMap[secretsValue.type] || secretsValue.type;
        const secretConfig = secretsValue[propertyName];
        if (secretConfig) {
          // Handle different types of secret configurations
          if (typeof secretConfig === 'string' && secretConfig.trim()) {
            addLine(`${secretsValue.type}:`, indent + 1);
            // Parse the YAML-like config and add with proper indentation
            const configLines = secretConfig.split('\n').filter((line: string) => line.trim());
            configLines.forEach((line: string) => {
              addLine(line.trim(), indent + 2);
            });
          } else if (typeof secretConfig === 'object') {
            // Handle object-based configurations (like our new secret manager configs)
            addLine(`${secretsValue.type}:`, indent + 1);
            processObject(secretConfig, indent + 2);
          }
        }
        return;
      }
      
      // Special handling for storage configuration
      if (key === 'storage' && typeof value === 'object' && (value as any).type) {
        const storageValue = value as any;
        addLine(`${displayKey}:`, indent);
        addLine(`type: ${formatValue(storageValue.type)}`, indent + 1);
        
        // Add the specific storage configuration if it exists
        const storageConfig = storageValue[storageValue.type];
        if (storageConfig) {
          if (typeof storageConfig === 'string' && storageConfig.trim()) {
            addLine(`${storageValue.type}:`, indent + 1);
            // Parse the YAML-like config and add with proper indentation
            const configLines = storageConfig.split('\n').filter((line: string) => line.trim());
            configLines.forEach((line: string) => {
              addLine(line.trim(), indent + 2);
            });
          } else if (typeof storageConfig === 'object') {
            addLine(`${storageValue.type}:`, indent + 1);
            processObject(storageConfig, indent + 2);
          }
        }
        return;
      }
      
      // Special handling for postgres datasource - include options verbatim
      if (key === 'postgres' && typeof value === 'object' && (value as any).options) {
        const postgresValue = value as any;
        addLine(`${displayKey}:`, indent);
        
        // Add other postgres fields first
        Object.entries(postgresValue).forEach(([pgKey, pgValue]) => {
          if (pgKey !== 'options' && pgValue !== null && pgValue !== undefined && pgValue !== '') {
            addLine(`${pgKey}: ${formatValue(pgValue)}`, indent + 1);
          }
        });
        
        // Add options content verbatim
        if (postgresValue.options && typeof postgresValue.options === 'string' && postgresValue.options.trim()) {
          const optionsLines = postgresValue.options.split('\n').filter((line: string) => line.trim());
          optionsLines.forEach((line: string) => {
            addLine(line.trim(), indent + 1);
          });
        }
        return;
      }
      
      // Special handling for imagePullSecrets - format as array
      if (key === 'imagePullSecrets' && typeof value === 'object' && (value as any).name) {
        const pullSecretValue = value as any;
        if (pullSecretValue.name) {
          addLine(`${displayKey}:`, indent);
          addLine(`- name: ${formatValue(pullSecretValue.name)}`, indent + 1);
        }
        return;
      }
      
      // Special handling for micronaut oauth2 - show block if it exists
      if (key === 'micronaut' && typeof value === 'object' && (value as any).security?.oauth2?.clients) {
        const clientsValue = (value as any).security.oauth2.clients;
        addLine(`${displayKey}:`, indent);
        addLine(`security:`, indent + 1);
        addLine(`oauth2:`, indent + 2);
        addLine(`enabled: true`, indent + 3);
        addLine(`clients:`, indent + 3);
        
        // Only add provider section if provider name is set
        if (clientsValue.providerName && typeof clientsValue.providerName === 'string' && clientsValue.providerName.trim()) {
          addLine(`${clientsValue.providerName}:`, indent + 4);
          if (clientsValue.clientId && typeof clientsValue.clientId === 'string' && clientsValue.clientId.trim()) {
            addLine(`client-id: ${formatValue(clientsValue.clientId)}`, indent + 5);
          }
          if (clientsValue.clientSecret && typeof clientsValue.clientSecret === 'string' && clientsValue.clientSecret.trim()) {
            addLine(`client-secret: ${formatValue(clientsValue.clientSecret)}`, indent + 5);
          }
          if (clientsValue.issuer && typeof clientsValue.issuer === 'string' && clientsValue.issuer.trim()) {
            addLine(`openid:`, indent + 5);
            addLine(`issuer: ${formatValue(clientsValue.issuer)}`, indent + 6);
          }
        }
        return;
      }
      
      // Special handling for micronaut oauth2 clients (fallback - should not be reached)
      if (key === 'clients' && typeof value === 'object' && (value as any).providerName) {
        const clientsValue = value as any;
        if (clientsValue.providerName && clientsValue.clientId && clientsValue.clientSecret && clientsValue.issuer) {
          addLine(`${displayKey}:`, indent);
          addLine(`${clientsValue.providerName}:`, indent + 1);
          addLine(`client-id: ${formatValue(clientsValue.clientId)}`, indent + 2);
          addLine(`client-secret: ${formatValue(clientsValue.clientSecret)}`, indent + 2);
          addLine(`openid:`, indent + 2);
          addLine(`issuer: ${formatValue(clientsValue.issuer)}`, indent + 3);
        }
        return;
      }
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        addLine(`${displayKey}:`, indent);
        processObject(value, indent + 1, obj);
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          addLine(`${displayKey}: []`, indent);
        } else {
          addLine(`${displayKey}:`, indent);
          value.forEach(item => {
            if (typeof item === 'object') {
              addLine('- ', indent + 1);
              Object.entries(item).forEach(([k, v]) => {
                const itemDisplayKey = k === 'minio' ? 'minio' : k;
                addLine(`${itemDisplayKey}: ${formatValue(v)}`, indent + 2);
              });
            } else {
              addLine(`- ${formatValue(item)}`, indent + 1);
            }
          });
        }
      } else {
        addLine(`${displayKey}: ${formatValue(value)}`, indent);
      }
    });
  };

  const formatValue = (value: any): string => {
    if (typeof value === 'string') {
      // Check if string contains special characters or spaces that need quoting
      if (value.includes(' ') || value.includes(':') || value.includes('#')) {
        return `"${value}"`;
      }
      return value;
    }
    if (typeof value === 'boolean') {
      return value.toString();
    }
    if (typeof value === 'number') {
      return value.toString();
    }
    return String(value);
  };

  // Filter out empty values and generate YAML
  const filteredValues = filterEmptyValues(values);
  processObject(filteredValues, 0, filteredValues);
  
  return yamlLines.join('\n');
};

const filterEmptyValues = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.filter(item => item !== null && item !== undefined && item !== '');
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const filtered: any = {};
    Object.entries(obj).forEach(([key, value]) => {
      // Skip oidcEnabled completely - it should never appear in YAML
      if (key === 'oidcEnabled') {
        return;
      }
      
      if (value !== null && value !== undefined && value !== '') {
        if (typeof value === 'object') {
          const filteredValue = filterEmptyValues(value);
          if (Array.isArray(filteredValue) ? filteredValue.length > 0 : Object.keys(filteredValue).length > 0) {
            filtered[key] = filteredValue;
          }
        } else {
          filtered[key] = value;
        }
      }
    });
    return filtered;
  }
  
  return obj;
};