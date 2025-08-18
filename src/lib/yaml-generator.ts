export const generateYaml = (values: any): string => {
  const yamlLines: string[] = [];
  
  const addLine = (line: string, indent = 0) => {
    yamlLines.push('  '.repeat(indent) + line);
  };

  const processObject = (obj: any, indent = 0) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        addLine(`${key}:`, indent);
        processObject(value, indent + 1);
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          addLine(`${key}: []`, indent);
        } else {
          addLine(`${key}:`, indent);
          value.forEach(item => {
            if (typeof item === 'object') {
              addLine('- ', indent + 1);
              Object.entries(item).forEach(([k, v]) => {
                addLine(`${k}: ${formatValue(v)}`, indent + 2);
              });
            } else {
              addLine(`- ${formatValue(item)}`, indent + 1);
            }
          });
        }
      } else {
        addLine(`${key}: ${formatValue(value)}`, indent);
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
  processObject(filteredValues);
  
  return yamlLines.join('\n');
};

const filterEmptyValues = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.filter(item => item !== null && item !== undefined && item !== '');
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const filtered: any = {};
    Object.entries(obj).forEach(([key, value]) => {
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