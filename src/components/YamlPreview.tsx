import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, FileText } from "lucide-react";
import { generateYaml } from "@/lib/yaml-generator";
import { useToast } from "@/hooks/use-toast";

interface YamlPreviewProps {
  values: any;
}

export const YamlPreview = ({ values }: YamlPreviewProps) => {
  const { toast } = useToast();
  const yaml = generateYaml(values);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(yaml);
      toast({
        title: "Copied!",
        description: "YAML content copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Generated YAML</CardTitle>
              <CardDescription>Live preview of your Helm values</CardDescription>
            </div>
          </div>
          <Button onClick={copyToClipboard} variant="secondary" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="bg-code-bg rounded-md p-4 text-sm overflow-auto max-h-[600px] border border-border">
            <code className="text-foreground font-mono leading-relaxed whitespace-pre">
              {yaml || '# Configure options above to generate YAML'}
            </code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};